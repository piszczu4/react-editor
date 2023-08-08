/* eslint-disable */
import { Node, mergeAttributes } from "@tiptap/core";

import { inputRules } from "prosemirror-inputrules";

import { insertMathCmd } from "@benrbray/prosemirror-math";

import {
	makeBlockMathInputRule,
	REGEX_BLOCK_MATH_DOLLARS,
} from "@benrbray/prosemirror-math";
import { EditorState, Transaction } from "@tiptap/pm/state";

import { NodeSelection } from "@tiptap/pm/state";

function insertMathDisplayCmd() {
	return function (state: EditorState, dispatch: (tr: Transaction) => void) {
		let { $from, $to } = state.selection;
		let tr = state.tr;
		let nodeType = state.schema.nodes.math_display.create();
		tr.replaceSelectionWith(nodeType);

		let found = -1;
		tr.doc.nodesBetween(
			$to.pos,
			Math.max(tr.selection.anchor, tr.selection.head),
			(node, pos) => {
				if (found > -1) return false;
				if (node.type.name === "math_display") {
					found = pos;
				}
			}
		);
		if (found > -1) console.log("there's a node at", found);

		tr.setSelection(NodeSelection.create(tr.doc, found));
		dispatch(tr);
		return true;
	};
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

	addKeyboardShortcuts() {
		return {
			"Mod-d": () =>
				insertMathDisplayCmd()(this.editor.state, this.editor.view.dispatch),
		};
	},
});

// import { mergeAttributes, Node } from "@tiptap/core";

// declare module "@tiptap/core" {
// 	interface Commands<ReturnType> {
// 		mathDisplay: {
// 			setMathDisplay: () => ReturnType;
// 		};
// 	}
// }

// export interface MathInlineOptions {
// 	HTMLAttributes: Record<string, any>;
// }

// export const MathDisplay = Node.create<MathInlineOptions>({
// 	name: "mathDisplay",

// 	group: "block math",

// 	inline: true,

// 	atom: true,

// 	code: true,

// 	content: "text*",

// 	addOptions() {
// 		return {
// 			HTMLAttributes: { class: "math-node" },
// 		};
// 	},

// 	parseHTML() {
// 		return [
// 			{
// 				tag: "math-display",
// 			},
// 		];
// 	},

// 	renderHTML({ HTMLAttributes }) {
// 		return [
// 			"math-display",
// 			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
// 			0,
// 		];
// 	},

// 	addCommands() {
// 		return {
// 			setMathDisplay:
// 				() =>
// 				({ chain }) => {
// 					return true;
// 				},
// 		};
// 	},
// });
