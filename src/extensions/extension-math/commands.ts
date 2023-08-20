// import { NodeType } from "@tiptap/pm/model";
// import { EditorState } from "@tiptap/pm/state";
// import { NodeSelection } from "@tiptap/pm/state";

import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

import { NodeSelection } from "@tiptap/pm/state";

export const mathBackspace = (state: EditorState, view: EditorView) => {
	// check node before
	let { $from } = state.selection;
	let nodeBefore = $from.nodeBefore;
	if (!nodeBefore) {
		return false;
	}
	if (nodeBefore.type.name == "math_inline") {
		// select math node
		let index = $from.index($from.depth);
		let $beforePos = state.doc.resolve($from.posAtIndex(index - 1));
		view.dispatch(state.tr.setSelection(new NodeSelection($beforePos)));
		return true;
	} else if (nodeBefore.type.name == "math_block") {
		/** @todo (8/1/20) implement backspace for math blocks
		 * check how code blocks behave when pressing backspace
		 */
		return false;
	}
	return false;
};
