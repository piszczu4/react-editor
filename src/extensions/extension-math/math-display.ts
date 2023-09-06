/* eslint-disable */
import { Node, PasteRule } from "@tiptap/core";

import { inputRules } from "@tiptap/pm/inputrules";

import { createMathView, renderMathHTML } from "./math";

import { mathPasteHandler } from "./commands/math-paste-handler";
import { makeBlockMathInputRule } from "./math-input-rules";
import { defaultBlockMathParseRules } from "./math-parse-rules";

const REGEX_BLOCK_MATH_DOLLARS_INPUT = /\$\$\s+$/;
const REGEX_BLOCK_MATH_DOLLARS_PASTE = /\$\$(.+)\$\$/g;
const REGEX_BLOCK_MATH_BRACKETS_PASTE = /\\\[(.+)\\\]/g;

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		math_display: {
			insertMathDisplay: () => ReturnType;
		};
	}
}

export const MathDisplay = Node.create({
	name: "math_display",
	group: "block math",
	content: "text*", // important!
	atom: true, // important!
	code: true,

	parseHTML() {
		return [
			{
				tag: "math-display",
				contentElement: "span.math-src",
			},
			...defaultBlockMathParseRules,
		];
	},

	renderHTML({ node }) {
		return renderMathHTML(true)(node);
	},

	addProseMirrorPlugins() {
		const inputRulePlugin = inputRules({
			rules: [
				makeBlockMathInputRule(REGEX_BLOCK_MATH_DOLLARS_INPUT, this.type),
			],
		});

		return [inputRulePlugin];
	},

	addPasteRules() {
		return [
			new PasteRule({
				find: REGEX_BLOCK_MATH_DOLLARS_PASTE,
				handler: mathPasteHandler(this.name),
			}),
			new PasteRule({
				find: REGEX_BLOCK_MATH_BRACKETS_PASTE,
				handler: mathPasteHandler(this.name),
			}),
		];
	},

	addNodeView() {
		return createMathView(true);
	},

	addCommands() {
		return {
			insertMathDisplay:
				() =>
				({ chain, state, tr }) => {
					let content = state.doc.textBetween(
						state.selection.from,
						state.selection.to
					);

					if (content) {
						return chain()
							.insertContent({
								type: this.name,
								content: [
									{
										type: "text",
										text: content,
									},
								],
							})
							.run();
					}

					return chain()
						.insertContent({
							type: this.name,
						})
						.run();
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			"Mod-d": () => this.editor.commands.insertMathDisplay(),
		};
	},
});
