import { toggleMark } from "@tiptap/pm/commands";
import { getCurrentTextNode } from "../../../helpers/getCurrentTextNode";
import { TextSelection } from "@tiptap/pm/state";
/**
 * Inserts a link into the document and opens the link edit tooltip at the cursor
 * @param state The current editor state
 * @param dispatch The dispatch function to use
 * @param view The current editor view
 */
export function insertRichTextLinkCommand({ state, dispatch, view }: any) {
	var _a, _b;
	// never actually toggle the mark, as that is done in the link editor
	// we do want to *pretend* to, as toggleMark checks for validity
	const valid = toggleMark(state.schema.marks.link, { href: null })(
		state,
		undefined
	);
	if (dispatch && valid) {
		let selectedText;
		let linkUrl;
		const $anchor = state.selection.$anchor;
		// if selection is empty, but inside link mark, use the link url/text from it
		if (state.selection.empty && $anchor.textOffset) {
			const currentTextNode = getCurrentTextNode(state);
			const mark = currentTextNode!.marks.find(
				(m) => m.type === state.schema.marks.link
			);
			if (mark) {
				selectedText = currentTextNode!.text;
				linkUrl = mark.attrs.href;
				// expand the selection so we're editing the entire link
				const pos = $anchor.pos;
				dispatch(
					state.tr.setSelection(
						TextSelection.create(
							state.doc,
							pos - $anchor.textOffset,
							pos - $anchor.textOffset + selectedText!.length
						)
					)
				);
			}
		} else {
			selectedText =
				(_b =
					(_a = state.selection.content().content.firstChild) === null ||
					_a === void 0
						? void 0
						: _a.textContent) !== null && _b !== void 0
					? _b
					: null;
			let linkMatch = /^http(s)?:\/\/\S+$/.exec(selectedText);
			linkUrl = linkMatch!.length > 0 ? linkMatch![0] : "";
		}
		showLinkEditor(view, linkUrl, selectedText);
	}
	return valid;
}
