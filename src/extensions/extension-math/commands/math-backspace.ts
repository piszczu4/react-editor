import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

import { NodeSelection } from "@tiptap/pm/state";

export const mathBackspace = (state: EditorState, view: EditorView) => {
	// check node before
	let { $from } = state.selection;
	let nodeBefore = $from.nodeBefore;

	if (nodeBefore && nodeBefore.type.name === "math_inline") {
		// select math node
		let index = $from.index($from.depth);
		let $beforePos = state.doc.resolve($from.posAtIndex(index - 1));
		view.dispatch(state.tr.setSelection(new NodeSelection($beforePos)));
		return true;
	}

	// Check if the index of current position is > 0 (otherwise there is no node before)
	if ($from.index(-1) > 0) {
		// Index in the parent node
		let index = $from.index($from.depth - 1);
		// Position of the previous node
		let pos = $from.posAtIndex(index - 1, $from.depth - 1);
		// Previous node
		let node = state.tr.doc.nodeAt(pos);
		//// Alternative
		// let node = $from.node(-1).child($from.index(-1) - 1)

		if (
			node?.type.name === "math_display" &&
			pos + node?.nodeSize! + 1 === $from.pos
		) {
			view.dispatch(
				state.tr.setSelection(NodeSelection.create(state.tr.doc, pos))
			);
			return true;
		}
	}

	return false;
};
