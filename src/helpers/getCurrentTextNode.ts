import { EditorState } from "@tiptap/pm/state";

/**
 * Returns the text node the cursor is currently anchored in
 * @param state The current editor state
 * @returns A text node or null if the cursor is not in a text node
 */
export function getCurrentTextNode(state: EditorState) {
	if (!state.selection.$anchor.textOffset) {
		return null;
	}
	const $anchor = state.selection.$anchor;
	return $anchor.parent.child($anchor.index());
}
