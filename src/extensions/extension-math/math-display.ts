/* eslint-disable */
import { Node, mergeAttributes } from "@tiptap/core";

import { inputRules } from "prosemirror-inputrules";

import { insertMathCmd } from "@benrbray/prosemirror-math";
import { TextSelection } from "@tiptap/pm/state";

import {
	makeBlockMathInputRule,
	REGEX_BLOCK_MATH_DOLLARS,
} from "@benrbray/prosemirror-math";
import { EditorState, Transaction } from "@tiptap/pm/state";

import { NodeSelection } from "@tiptap/pm/state";

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
				tag: "math-display", // important!
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"math-display",
			mergeAttributes({ class: "math-node" }, HTMLAttributes),
			0,
		];
	},

	addProseMirrorPlugins() {
		const inputRulePlugin = inputRules({
			rules: [makeBlockMathInputRule(REGEX_BLOCK_MATH_DOLLARS, this.type)],
		});

		return [inputRulePlugin];
	},

	addCommands() {
		return {
			toggleMathDisplay:
				() =>
				({ chain, state, tr }) => {
					let { $from } = tr.selection;

					let content = state.doc.cut(
						state.selection.from,
						state.selection.to
					).textContent;

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
