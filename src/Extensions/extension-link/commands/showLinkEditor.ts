import { EditorView } from "@tiptap/pm/view";
import { showModal } from "@stackoverflow/stacks";
import { LinkEditor } from "../link-editor";

import { createRoot } from "react-dom/client";
/**
 * Dispatches a transaction to show the link editor with the given url and text filled in
 * @param view The current editor view
 * @param url The value to prefill the url input with
 * @param text The value to prefill the text input with
 */
export function showLinkEditor(
	view: EditorView,
	url: string = "",
	text: string = ""
) {
	let linkEditor = new LinkEditor({
		view: view,
		href: url,
		title: text,
	});

	let modal = linkEditor.render();
	let root = createRoot(document.querySelector("#link-editor") as HTMLElement);
	root.render(modal);

	linkEditor.showModal();
}
