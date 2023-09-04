/* eslint-disable */
import { Node, PasteRule } from "@tiptap/core";

import { InputRule, inputRules } from "@tiptap/pm/inputrules";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import { NodeType } from "@tiptap/pm/model";

import { createMathView } from "./math-plugin";
import katex from "katex";

import { defaultBlockMathParseRules } from "./plugins/math-parse-rules";
import { mathPasteHandler } from "./commands";

const REGEX_BLOCK_MATH_DOLLARS_INPUT = /\$\$\s+$/;
const REGEX_BLOCK_MATH_DOLLARS_PASTE = /\$\$(.+)\$\$/g;
const REGEX_BLOCK_MATH_BRACKETS_PASTE = /\\\[(.+)\\\]/g;

function makeBlockMathInputRule(
	pattern: RegExp,
	nodeType: NodeType,
	getAttrs?: any
) {
	return new InputRule(pattern, (state, match, start, end) => {
		let $start = state.doc.resolve(start);
		let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
		if (
			!$start
				.node(-1)
				.canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)
		)
			return null;
		let tr = state.tr
			.delete(start, end)
			.setBlockType(start, start, nodeType, attrs);
		return tr.setSelection(
			NodeSelection.create(tr.doc, tr.mapping.map($start.pos - 1))
		);
	});
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		math_display: {
			toggleMathDisplay: () => ReturnType;
		};
	}
}

// function insertMathDisplayCmd() {
// 	return function (state: EditorState, dispatch: (tr: Transaction) => void) {
// 		let { $from, $to } = state.selection;
// 		let tr = state.tr;
// 		let nodeType = state.schema.nodes.math_display.create();
// 		tr.replaceSelectionWith(nodeType);

// 		let found = -1;
// 		tr.doc.nodesBetween(
// 			$to.pos,
// 			Math.max(tr.selection.anchor, tr.selection.head),
// 			(node, pos) => {
// 				if (found > -1) return false;
// 				if (node.type.name === "math_display") {
// 					found = pos;
// 				}
// 			}
// 		);
// 		if (found > -1) console.log("there's a node at", found);

// 		tr.setSelection(NodeSelection.create(tr.doc, found));
// 		dispatch(tr);
// 		return true;
// 	};
// }

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

	renderHTML({ HTMLAttributes, node }) {
		let dom = document.createElement("math-display");
		dom.className = "math-node";

		let tex = node.textContent;
		let src = document.createElement("span");
		src.className = "math-src";
		src.innerText = tex;

		let render = document.createElement("span");
		render.className = "math-render";

		katex.render(tex, render, {
			displayMode: true,
			globalGroup: true,
		});

		dom.appendChild(src);
		dom.appendChild(render);

		return dom;
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

	addStorage() {
		return {
			lastCursor: 0,
		};
	},

	addCommands() {
		return {
			toggleMathDisplay:
				() =>
				({ chain, state, tr }) => {
					let { $from } = tr.selection;

					let content = state.doc.textBetween(
						state.selection.from,
						state.selection.to
					);

					if (this.editor.isActive(this.name)) {
						return chain()
							.focus()
							.command(({ tr }) => {
								tr.insertText(content);
								tr.setSelection(
									TextSelection.create(
										tr.doc,
										$from.pos + 1,
										$from.pos + 1 + content.length
									)
								);
								return true;
							})
							.run();
					}

					if (content) {
						return chain()
							.insertContent({
								type: this.name,
								content: [
									{
										type: "text",
										text: content ?? "",
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
					// return chain()
					// 	.command(({ tr }) => {
					// 		tr.replaceSelectionWith(
					// 			this.type.create(
					// 				{},
					// 				content ? state.schema.text(content) : undefined
					// 			)
					// 		);

					// 		tr.setSelection(NodeSelection.create(tr.doc, $from.pos));

					// 		return true;
					// 	})
					// 	.run();
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			"Mod-d": () => this.editor.commands.toggleMathDisplay(),
		};
	},
});
