import { Editor } from "@tiptap/react";

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
