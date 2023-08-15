import { Editor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";

/** Gets the modifier key for the current platform; i.e. "Command" on macOS and "Control" elsewhere */
export function getPlatformModKey() {
	return /Mac|iP(hone|[oa]d)/.test(navigator.platform) ? "Cmd" : "Ctrl";
}
/**
 * Returns a string containing the label and readable keyboard shortcut for button tooltips
 * @param mapping Corresponding command mapping (keyboard shortcut)
 */
export function getShortcut(mapping: string) {
	if (!mapping.startsWith("Mod-")) {
		return mapping;
	}
	return getPlatformModKey() + mapping.slice(3);
}

export function findNodePos(editor: Editor, nodeType: string) {
	let view = editor.view;
	const { state } = view;
	const { selection } = state;

	// support for CellSelections
	const { ranges } = selection;
	const from = Math.min(...ranges.map((range) => range.$from.pos));
	const to = Math.max(...ranges.map((range) => range.$to.pos));

	let found = -1;

	editor.view.state.doc.nodesBetween(from, to, (node, pos) => {
		if (node.type.name === nodeType) {
			found = pos;
		}
	});
	if (found > -1) {
		return found;
	}
	return null;
}

export function findClosestNode(editor: any, nodeType: string) {
	let view = editor.view;
	const { state } = view;
	const { selection } = state;

	// support for CellSelections
	const { ranges } = selection;
	const from = Math.min(...ranges.map((range: any) => range.$from.pos));

	let found = -1;

	editor.view.state.doc.nodesBetween(
		from,
		editor.state.doc.content.size,
		(node: any, pos: any) => {
			if (found !== -1) return false;
			if (node.type.name === nodeType) {
				found = pos;
			}
		}
	);
	if (found > -1) {
		return found;
	}
	return null;
}

/**
 * Compares two states and returns true if the doc has changed between them.
 * The doc is considered changed if:
 *      * the document node changed (@see docNodeChanged)
 *      * the selection has changed
 * @param prevState The "old" / previous editor state
 * @param newState The "new" / current editor state
 */
export function docChanged(
	prevState: EditorState,
	newState: EditorState
): boolean {
	return (
		docNodeChanged(prevState, newState) ||
		!prevState.selection.eq(newState.selection)
	);
}

/**
 * Compares two states and returns true if the doc has changed between them.
 * The doc is considered changed if:
 *      * its content changed
 *      * the stored marks have changed
 * @param prevState The "old" / previous editor state
 * @param newState The "new" / current editor state
 */
export function docNodeChanged(
	prevState: EditorState,
	newState: EditorState
): boolean {
	// if either are null, just return "changed"
	if (!prevState || !newState) {
		return true;
	}

	return (
		!prevState.doc.eq(newState.doc) ||
		prevState.storedMarks !== newState.storedMarks
	);
}
