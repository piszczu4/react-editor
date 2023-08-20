import { Editor } from "@tiptap/core";

export function getFontSize(editor: Editor) {
	let _fontSize = Number(editor.getAttributes("textStyle")["fontSize"]);
	if (!_fontSize) {
		var dom = editor.view.domAtPos(editor.state.selection.from)
			.node as HTMLElement;
		if (dom.nodeType === 3) {
			dom = dom.parentElement!;
		}
		var defaultFontSize = window
			.getComputedStyle(dom as Element, null)
			.getPropertyValue("font-size");
		_fontSize = Number(defaultFontSize.replace("px", ""));
	}
	return Number(_fontSize);
}
