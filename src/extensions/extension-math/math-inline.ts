/* eslint-disable */
import { Node, PasteRule } from "@tiptap/core";
import { inputRules } from "@tiptap/pm/inputrules";
import { NodeSelection } from "@tiptap/pm/state";

import { mathPasteHandler } from "./commands/math-paste-handler";
import { createMathView, renderMathHTML } from "./math";
import { makeInlineMathInputRule } from "./math-input-rules";
import { defaultInlineMathParseRules } from "./math-parse-rules";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		math_inline: {
			insertMathInline: () => ReturnType;
		};
	}
}

const REGEX_INLINE_MATH_DOLLARS_INPUT = /(?<!\$)\$([^$]+)\$(?!\$)/;
const REGEX_INLINE_MATH_DOLLARS_PASTE = new RegExp(
	REGEX_INLINE_MATH_DOLLARS_INPUT,
	"g"
);
const REGEX_INLINE_MATH_BRACKETS_PASTE = /\\\((.+)\\\)/g;

export const MathInline = Node.create({
	name: "math_inline",
	group: "inline math",
	content: "text*", // important!
	inline: true, // important!
	atom: true, // important!
	code: true,

	parseHTML() {
		return [
			{
				tag: "math-inline",
				contentElement: "span.math-src",
			},
			...defaultInlineMathParseRules,
		];
	},

	renderHTML({ node }) {
		return renderMathHTML(false)(node);
	},

	addProseMirrorPlugins() {
		const inputRulePlugin = inputRules({
			rules: [
				makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS_INPUT, this.type),
			],
		});

		return [inputRulePlugin];
	},

	addPasteRules() {
		return [
			new PasteRule({
				find: REGEX_INLINE_MATH_DOLLARS_PASTE,
				handler: mathPasteHandler(this.name),
			}),
			new PasteRule({
				find: REGEX_INLINE_MATH_BRACKETS_PASTE,
				handler: mathPasteHandler(this.name),
			}),
		];
	},

	addNodeView() {
		return createMathView(false);
	},

	addKeyboardShortcuts() {
		return {
			"Mod-m": () => this.editor.commands.insertMathInline(),
		};
	},

	addCommands() {
		return {
			insertMathInline:
				() =>
				({ chain, state, tr }) => {
					let { $from } = tr.selection;
					let index = $from.index();
					if (!$from.parent.canReplaceWith(index, index, this.type)) {
						return false;
					}

					let content = state.doc.textBetween(
						state.selection.from,
						state.selection.to
					);

					return chain()
						.command(({ tr }) => {
							tr.replaceSelectionWith(
								this.type.create(
									{},
									content ? state.schema.text(content) : undefined
								)
							);

							tr.setSelection(NodeSelection.create(tr.doc, $from.pos));
							// TODO
							// https://discuss.prosemirror.net/t/how-to-wrap-a-text-selection-inside-inline-node-a-move-cursor-to-the-end/5774
							return true;
						})
						.run();
				},
		};
	},
});
