/* eslint-disable */
import { Node, PasteRule, createNodeFromContent } from "@tiptap/core";
import { InputRule, inputRules } from "@tiptap/pm/inputrules";
import { NodeType } from "@tiptap/pm/model";
import {
	NodeSelection,
	TextSelection,
	Plugin,
	PluginKey,
} from "@tiptap/pm/state";

import katex from "katex";
import { mathBackspace, mathPasteHandler } from "./commands";
import { createMathView, mathPlugin } from "./math-plugin";

import { defaultInlineMathParseRules } from "./plugins/math-parse-rules";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		math_inline: {
			toggleMathInline: () => ReturnType;
			unsetMathInline: () => ReturnType;
		};
	}
}

const REGEX_INLINE_MATH_DOLLARS_INPUT = /(?<!\$)\$([^$]+)\$(?!\$)/;
///\$(.+)\$/;
const REGEX_INLINE_MATH_DOLLARS_PASTE = new RegExp(
	REGEX_INLINE_MATH_DOLLARS_INPUT,
	"g"
);
const REGEX_INLINE_MATH_BRACKETS_PASTE = /\\\((.+)\\\)/g;

function makeInlineMathInputRule(
	pattern: RegExp,
	nodeType: NodeType,
	getAttrs?: any
) {
	return new InputRule(pattern, (state, match, start, end) => {
		let $start = state.doc.resolve(start);
		let index = $start.index();
		let $end = state.doc.resolve(end);
		// get attrs
		let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
		// check if replacement valid
		if (!$start.parent.canReplaceWith(index, $end.index(), nodeType)) {
			return null;
		}
		// perform replacement
		return state.tr.replaceRangeWith(
			start,
			end,
			nodeType.create(attrs, nodeType.schema.text(match[1]))
		);
	});
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
			...defaultInlineMathParseRules,
		];
	},

	renderHTML({ node }) {
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
			rules: [
				makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS_INPUT, this.type),
			],
		});

		const pasteMathPlugin = new Plugin({
			key: new PluginKey("pasteMathPlugin"),
			props: {
				handlePaste: (view, event) => {
					if (!event.clipboardData) {
						return false;
					}

					// don’t create a new math block within math block
					if (this.editor.isActive(this.type.name)) {
						return false;
					}

					let text = event.clipboardData.getData("text/plain");
					if (!text) return false;

					let doc = createNodeFromContent(text, view.state.schema, {
						slice: true,
					}).toJSON();

					if (
						doc.length === 1 &&
						(doc[0].type === "math_inline" || doc[0].type === "math_display")
					) {
						let { editor } = this;
						editor.commands.insertContent(doc);
						return true;
					}

					return false;
				},
			},
		});

		return [mathPlugin, pasteMathPlugin, inputRulePlugin];
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
