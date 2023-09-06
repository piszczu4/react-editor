/*---------------------------------------------------------
 *  Author: Benjamin R. Bray
 *  License: MIT (see LICENSE in project root for details)
 *--------------------------------------------------------*/

// prosemirror imports
import { NodeViewRendererProps } from "@tiptap/react";
import { PluginKey, PluginSpec, Plugin as ProsePlugin } from "@tiptap/pm/state";
import { MathView } from "./math-nodeview";

////////////////////////////////////////////////////////////

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

/**
 * Returns a function suitable for passing as a field in `EditorProps.nodeViews`.
 * @param displayMode TRUE for block math, FALSE for inline math.
 * @see https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews
 */
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

let mathPluginSpec: PluginSpec<IMathPluginState> = {
	key: MATH_PLUGIN_KEY,
	state: {
		init(config, instance) {
			return {
				macros: {},
				activeNodeViews: [],
				prevCursorPos: 0,
			};
		},
		apply(tr, value, oldState, newState) {
			// produce updated state field for this plugin
			let node = tr.doc.nodeAt(oldState.selection.from);
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
};

export const mathPlugin = new ProsePlugin(mathPluginSpec);
