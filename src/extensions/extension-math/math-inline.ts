/* eslint-disable */
import { Node, mergeAttributes } from "@tiptap/core";

import { inputRules } from "prosemirror-inputrules";

import { insertMathCmd } from "@benrbray/prosemirror-math";

import {
	makeInlineMathInputRule,
	REGEX_INLINE_MATH_DOLLARS,
	mathPlugin,
} from "@benrbray/prosemirror-math";

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
				tag: "math-inline", // important!
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"math-inline",
			mergeAttributes({ class: "math-node" }, HTMLAttributes),
			0,
		];
	},

	addProseMirrorPlugins() {
		const inputRulePlugin = inputRules({
			rules: [makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS, this.type)],
		});

		return [mathPlugin, inputRulePlugin];
	},

	addKeyboardShortcuts() {
		return {
			"Mod-m": () =>
				insertMathCmd(this.editor.schema.nodes.math_inline)(
					this.editor.state,
					this.editor.view.dispatch
				),
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
