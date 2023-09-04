/* eslint-disable */
import { Node, mergeAttributes } from "@tiptap/core";

import { inputRules } from "prosemirror-inputrules";

import { insertMathCmd } from "@benrbray/prosemirror-math";
import { setBlockType } from "@tiptap/pm/commands";

import { Transform } from "@tiptap/pm/transform";
import { Editor, getNodeAttributes } from "@tiptap/react";
import {
	makeInlineMathInputRule,
	REGEX_INLINE_MATH_DOLLARS,
	mathPlugin,
} from "@benrbray/prosemirror-math";
import { NodeSelection, TextSelection, Selection } from "@tiptap/pm/state";
import { NodeRange } from "@tiptap/pm/model";
import { selectionToInsertionEnd } from "@tiptap/react";
import { findChildren, findParentNode } from "@tiptap/react";

import { getNodeAtPosition } from "../extension-commands";
import { mathBackspace } from "./commands";
import { joinBackward } from "../../commands/joinBackward";

import { isAtEndOfNode } from "../../commands/isAtEndOfNode";
import { findNode, findNodePos } from "../../utils";

import katex from "katex";
import { createMathView } from "./math-plugin";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		math_inline: {
			toggleMathInline: () => ReturnType;
			unsetMathInline: () => ReturnType;
		};
	}
}

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
		];
	},

	renderHTML({ HTMLAttributes, node }) {
		let dom = document.createElement("math-inline");
		dom.className = "math-node";

		let tex = node.textContent;
		let src = document.createElement("span");
		src.className = "math-src";
		src.innerText = tex;

		let render = document.createElement("span");
		render.className = "math-render";

		katex.render(tex, render, {
			displayMode: false,
			globalGroup: true,
		});

		dom.appendChild(src);
		dom.appendChild(render);

		return dom;
	},

	addProseMirrorPlugins() {
		const inputRulePlugin = inputRules({
			rules: [makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS, this.type)],
		});

		return [mathPlugin, inputRulePlugin];
	},

	addStorage() {
		return {
			lastPos: 0,
		};
	},

	// onSelectionUpdate() {
	// 	if (this.editor.isActive("math_inline")) {
	// 		let parent = findNode(this.editor, "math_inline");
	// 		console.log(parent);
	// 		let pos = parent?.pos! + parent?.node.content.size! + 1;
	// 		console.log(pos);

	// 		return this.editor
	// 			.chain()
	// 			.focus()
	// 			.command(({ tr }) => {
	// 				tr.setSelection(Selection.near(this.editor.state.doc.resolve(pos)));
	// 				return true;
	// 			})
	// 			.run();
	// 	}
	// 	this.storage.lastPos = this.editor.state.selection.from;
	// 	console.log(this.storage.lastPos);
	// },

	addKeyboardShortcuts() {
		return {
			"Mod-m": () => this.editor.commands.toggleMathInline(),
			Backspace: () => mathBackspace(this.editor.state, this.editor.view),
		};
	},

	addCommands() {
		return {
			toggleMathInline:
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

					if (this.editor.isActive(this.name)) {
						return chain()
							.focus()
							.command(({ tr }) => {
								tr.insertText(content);
								tr.setSelection(
									TextSelection.create(
										tr.doc,
										$from.pos,
										$from.pos + content.length
									)
								);
								return true;
							})
							.run();
					}

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

					// setMathInline:
					// 	() =>
					// 	({ chain, state, tr, view }) => {
					// 		let { $from, $to, $anchor, $head, from, to } = tr.selection;
					// 		let index = $from.index();
					// 		if (!$from.parent.canReplaceWith(index, index, this.type)) {
					// 			return false;
					// 		}

					// 		let content = tr.doc.cut($from.pos, $to.pos).textContent;

					// 		// let parent = findParentNode(() => true)(tr.selection);

					// 		// let nodePos = findNodePos(this.editor, "math_inline");

					// 		// if (nodePos) {
					// 		// 	let node = this.editor.state.doc.nodeAt(nodePos!);

					// 		// 	let nodeSelection = NodeSelection.create(tr.doc, nodePos!);
					// 		// 	// let nodeSelection = NodeSelection.create(tr.doc, parent!.pos);

					// 		// 	tr.setSelection(nodeSelection);

					// 		// 	// let x = TextSelection.create(
					// 		// 	// 	tr.doc,
					// 		// 	// 	parent?.start!,
					// 		// 	// 	parent?.start! + parent?.node.content.size!
					// 		// 	// );

					// 		// 	// tr.setSelection(x);

					// 		// 	view.dispatch(tr);
					// 		// 	// return true;
					// 		// }

					// 		return chain()
					// 			.focus()
					// 			.command(({ tr }) => {
					// 				tr.replaceSelectionWith(
					// 					this.type.create(
					// 						{},
					// 						content ? state.schema.text(content) : undefined
					// 					)
					// 				);

					// 				tr.setSelection(NodeSelection.create(tr.doc, $from.pos));

					// 				return true;
					// 			})
					// 			.run();

					// return chain()
					// 	.command(({ tr, commands }) => {
					// 		if (content === "") {
					// 			tr.replaceSelectionWith(
					// 				state.schema.nodes.math_inline.create()
					// 			);
					// 		} else {
					// 			tr.replaceSelectionWith(
					// 				state.schema.nodes.math_inline.create(
					// 					{},
					// 					state.schema.text(content)
					// 				)
					// 			);
					// 		}
					// 		return true;
					// 	})
					// 	.run();
				},

			// let { $from } = state.selection, index = $from.index();
			// if (!$from.parent.canReplaceWith(index, index, mathNodeType)) {
			// 	return false;
			// }
			// if (dispatch) {
			// 	let tr = state.tr.replaceSelectionWith(mathNodeType.create({}));
			// 	tr = tr.setSelection(prosemirrorState.NodeSelection.create(tr.doc, $from.pos));
			// 	dispatch(tr);
			// }
			// return true;

			// unsetMathInline:
			// 	() =>
			// 	({ editor }) => {},
		};
	},
});

// import { mergeAttributes, Node } from "@tiptap/core";

// declare module "@tiptap/core" {
// 	interface Commands<ReturnType> {
// 		mathInline: {
// 			setMathInline: () => ReturnType;
// 		};
// 	}
// }

// export interface MathInlineOptions {
// 	HTMLAttributes: Record<string, any>;
// }

// export const MathInline = Node.create<MathInlineOptions>({
// 	name: "mathInline",

// 	group: "inline math",

// 	inline: true,

// 	atom: true,

// 	content: "text*",

// 	addOptions() {
// 		return {
// 			HTMLAttributes: { class: "math-node" },
// 		};
// 	},

// 	parseHTML() {
// 		return [
// 			{
// 				tag: "math-inline",
// 			},
// 		];
// 	},

// 	renderHTML({ HTMLAttributes }) {
// 		return [
// 			"math-inline",
// 			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
// 			0,
// 		];
// 	},

// 	addCommands() {
// 		return {
// 			setMathInline:
// 				() =>
// 				({ chain }) => {
// 					return true;
// 				},
// 		};
// 	},
// });
