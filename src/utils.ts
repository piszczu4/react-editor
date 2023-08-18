import { Editor, NodeWithPos } from "@tiptap/core";
import { Node } from "@tiptap/pm/model";
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

/**
Searches for a node within the current selection. If direction is not null, it looks backward and/or forward too.
 */
export function findNode(
	editor: Editor,
	nodeType: string,
	direction: -1 | 1 | "both" | null = null
): NodeWithPos | null {
	let view = editor.view;
	const { state } = view;
	const { selection } = state;

	// support for CellSelections
	const { ranges } = selection;
	const from = Math.min(...ranges.map((range) => range.$from.pos));
	const to = Math.max(...ranges.map((range) => range.$to.pos));

	let _node: Node | null = null;
	let _pos: number | null = null;

	editor.view.state.doc.nodesBetween(from, to, (node, pos) => {
		if (_node) return false;
		if (node.type.name === nodeType) {
			_pos = pos;
			_node = node;
		}
	});

	if (!_node && (direction === "both" || direction === 1)) {
		editor.view.state.doc.nodesBetween(
			to,
			state.doc.content.size,
			(node, pos) => {
				if (_node) return false;
				if (node.type.name === nodeType) {
					_pos = pos;
					_node = node;
				}
			}
		);
	}

	if (!_node && (direction === "both" || direction === -1)) {
		editor.view.state.doc.nodesBetween(0, from, (node, pos) => {
			if (_node) return false;
			if (node.type.name === nodeType) {
				_pos = pos;
				_node = node;
			}
		});
	}

	if (_node) {
		return { node: _node, pos: _pos! };
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

// To remove...
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

const validLinkRegex =
	/^((https?|ftp):\/\/|\/)[-a-z0-9+&@#/%?=~_|!:,.;()*[\]$]+$/;
const validMailtoRegex = /^mailto:[#-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+$/;
const validImageLinkRegex =
	/^((https?|ftp):\/\/|\/)[-a-z0-9+&@#/%?=~_|!:,.;()*[\]$]+(jpe?g|png)$/;

export function validateLink(url: string) {
	const normalizedUrl =
		url === null || url === void 0 ? void 0 : url.trim().toLowerCase();
	return (
		validLinkRegex.test(normalizedUrl!) || validMailtoRegex.test(normalizedUrl!)
	);
}

export function validateImageLink(url: string) {
	const normalizedUrl =
		url === null || url === void 0 ? void 0 : url.trim().toLowerCase();
	return validImageLinkRegex.test(normalizedUrl!);
}
