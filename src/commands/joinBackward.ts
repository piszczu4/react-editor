// @ts-nocheck

import { joinBackward as originalJoinBackward } from "@tiptap/pm/commands";

import { RawCommands } from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		joinBackward: {
			/**
			 * Join two nodes Backwards.
			 */
			joinBackward: () => ReturnType;
		};
	}
}

function findCutBefore($pos) {
	if (!$pos.parent.type.spec.isolating)
		for (let i = $pos.depth - 1; i >= 0; i--) {
			if ($pos.index(i) > 0) return $pos.doc.resolve($pos.before(i + 1));
			if ($pos.node(i).type.spec.isolating) break;
		}
	return null;
}

function atBlockStart(state, view) {
	let { $cursor } = state.selection;
	if (
		!$cursor ||
		(view ? !view.endOfTextblock("backward", state) : $cursor.parentOffset > 0)
	)
		return null;
	return $cursor;
}

export const joinBackward: RawCommands["joinBackward"] = ({
	state,
	dispatch,
	view,
}) => {
	/**
If the selection is empty and at the start of a textblock, try to
reduce the distance between that block and the one before it—if
there's a block directly before it that can be joined, join them.
If not, try to move the selected block closer to the next one in
the document structure by lifting it out of its parent or moving it
into a parent of the previous block. Will use the view for accurate
(bidi-aware) start-of-textblock detection if given.
*/
	let { $cursor } = state.selection;
	if (!$cursor) return false;
	let $cut = findCutBefore($cursor);
	// If there is no node before this, try to lift
	if (!$cut) {
		let range = $cursor.blockRange(),
			target = range && liftTarget(range);
		if (target == null) return false;
		if (dispatch) dispatch(state.tr.lift(range, target).scrollIntoView());
		return true;
	}
	let before = $cut.nodeBefore;
	// Apply the joining algorithm
	if (!before.type.spec.isolating && deleteBarrier(state, $cut, dispatch))
		return true;
	// If the node below has no content and the node above is
	// selectable, delete the node below and select the one above.
	if (
		$cursor.parent.content.size == 0 &&
		(textblockAt(before, "end") || NodeSelection.isSelectable(before))
	) {
		let delStep = replaceStep(
			state.doc,
			$cursor.before(),
			$cursor.after(),
			Slice.empty
		);
		if (delStep && delStep.slice.size < delStep.to - delStep.from) {
			let tr = state.tr.step(delStep);
			tr.setSelection(
				textblockAt(before, "end")
					? Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos, -1)), -1)
					: NodeSelection.create(tr.doc, $cut.pos - before.nodeSize)
			);
			view.dispatch(tr.scrollIntoView());
			return true;
		}
	}
	// If the node before is an atom, delete it
	if (before.isAtom && $cut.depth == $cursor.depth - 1) {
		view.dispatch(
			state.tr.delete($cut.pos - before.nodeSize, $cut.pos).scrollIntoView()
		);
		return true;
	}
	return false;
};
