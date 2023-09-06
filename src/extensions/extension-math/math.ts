import {
	Extension,
	createNodeFromContent,
	NodeViewRendererProps,
} from "@tiptap/react";
import { PluginKey, PluginSpec, Plugin as ProsePlugin } from "@tiptap/pm/state";
import { mathBackspace } from "./commands/math-backspace";
import { MathView } from "./math-nodeview";
import { Node } from "@tiptap/pm/model";

import katex from "katex";

export interface IMathPluginState {
	macros: { [cmd: string]: string };
	/** A list of currently active `NodeView`s, in insertion order. */
	activeNodeViews: MathView[];
	/**
	 * Used to determine whether to place the cursor in the front- or back-most
	 * position when expanding a math node, without overriding the default arrow
	 * key behavior.
	 */
	prevCursorPos: number;
}

// uniquely identifies the prosemirror-math plugin
const MATH_PLUGIN_KEY = new PluginKey<IMathPluginState>("prosemirror-math");

export function createMathView(displayMode: boolean) {
	return ({ editor, node, getPos }: NodeViewRendererProps): MathView => {
		let view = editor.view;
		/** @todo is this necessary?
		 * Docs says that for any function proprs, the current plugin instance
		 * will be bound to `this`.  However, the typings don't reflect this.
		 */
		let pluginState = MATH_PLUGIN_KEY.getState(view.state);
		if (!pluginState) {
			throw new Error("no math plugin!");
		}
		let nodeViews = pluginState.activeNodeViews;

		// set up NodeView
		let nodeView = new MathView(
			node,
			view,
			getPos as () => number,
			{ katexOptions: { displayMode, macros: pluginState.macros } },
			MATH_PLUGIN_KEY,
			() => {
				nodeViews.splice(nodeViews.indexOf(nodeView));
			}
		);

		nodeViews.push(nodeView);
		return nodeView;
	};
}

export const renderMathHTML = (displayMode: boolean) => (node: Node) => {
	let dom = document.createElement(
		displayMode ? "math-display" : "math-inline"
	);
	dom.className = "math-node";

	let tex = node.textContent;
	let src = document.createElement("span");
	src.className = "math-src";
	src.innerText = tex;

	let render = document.createElement("span");
	render.className = "math-render";

	katex.render(tex, render, {
		displayMode: displayMode,
		globalGroup: true,
	});

	dom.appendChild(src);
	dom.appendChild(render);

	return dom;
};

export const Math = Extension.create({
	name: "math",

	addKeyboardShortcuts() {
		return {
			Backspace: () => mathBackspace(this.editor.state, this.editor.view),
		};
	},
	addProseMirrorPlugins() {
		let mathPluginSpec: PluginSpec<IMathPluginState> = {
			key: MATH_PLUGIN_KEY,
			state: {
				init() {
					return {
						macros: {},
						activeNodeViews: [],
						prevCursorPos: 0,
					};
				},
				apply(tr, value, oldState, newState) {
					// produce updated state field for this plugin
					let node = tr.doc.nodeAt(newState.selection.from);
					let pos;
					if (
						node?.type.name === "math_inline" ||
						node?.type.name === "math_display"
					)
						pos = value.prevCursorPos;
					else pos = oldState.selection.from;

					return {
						// these values are left unchanged
						activeNodeViews: value.activeNodeViews,
						macros: value.macros,
						// update with the second-most recent cursor pos
						prevCursorPos: pos,
					};
				},
				/** @todo (8/21/20) implement serialization for math plugin */
				// toJSON(value) { },
				// fromJSON(config, value, state){ return {}; }
			},
			props: {
				handlePaste: (view, event) => {
					if (!event.clipboardData) {
						return false;
					}

					// don’t create a new math block within math block
					if (
						this.editor.isActive("math_inline") ||
						this.editor.isActive("math_display")
					) {
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
						this.editor
							.chain()
							.insertContent(doc)
							.command(({ chain, tr }) => {
								if (doc[0].type === "math_display") {
									chain().insertContentAt(tr.selection.to, {
										type: "paragraph",
										attrs: {},
									});
								}
								return true;
							})
							.run();

						return true;
					}

					return false;
				},
			},
		};

		let mathPlugin = new ProsePlugin(mathPluginSpec);
		return [mathPlugin];
	},
});
