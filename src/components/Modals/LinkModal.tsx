import { EditorView } from "@tiptap/pm/view";
import { Editor } from "@tiptap/react";
import { TextSelection } from "prosemirror-state";
import { useRef, useState } from "react";
import { _t } from "../../helpers/strings";
import { Modal } from "../Modal";

import "tippy.js/dist/svg-arrow.css";

import { stackOverflowValidateLink } from "../../extensions/extension-link/link-editor";
import CloseIcon from "../Icons/CloseIcon";

type Props = {
	isOpen: boolean;
	hide: () => void;
	destroy: () => void;
	editor?: Editor;
	href?: string;
	text?: string;
};

export function LinkModal({
	isOpen,
	hide,
	destroy,
	editor,
	href = "",
	text = "",
}: Props) {
	let ref = useRef<HTMLFormElement>(null);
	let saveBtnRef = useRef<HTMLButtonElement>(null);
	let hrefInputRef = useRef<HTMLInputElement>(null);
	let textInputRef = useRef<HTMLInputElement>(null);
	let hrefMessageRef = useRef<HTMLParagraphElement>(null);

	let [isValid, setIsValid] = useState(false);

	let validate = (href: string) => {
		setIsValid(stackOverflowValidateLink(href));
	};

	let resetEditor = () => {
		hrefInputRef.current!.value = "";
		textInputRef.current!.value = "";
	};

	let handleSave = (view: EditorView) => {
		const text = textInputRef.current!.value || href;
		const node = view.state.schema.text(text!, []);
		resetEditor();
		hide();
		let tr = view.state.tr;
		// set the text first, inheriting all marks
		tr = tr.replaceSelectionWith(node, true);
		// reselect the now unselected text
		tr = tr.setSelection(
			TextSelection.create(
				tr.doc,
				tr.selection.from - text!.length,
				tr.selection.to
			)
		);
		// drop any link marks that might already exist
		tr = tr.removeMark(
			tr.selection.from,
			tr.selection.to,
			view.state.schema.marks.link
		);
		// add our link mark back onto the selection
		tr = tr.addMark(
			tr.selection.from,
			tr.selection.to,
			view.state.schema.marks.link.create({ href: href, text: text })
		);
		view.dispatch(tr);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		handleSave(editor!.view!);
	};

	const handleReset = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		resetEditor();
		hide();
	};

	const handleHrefInput = (e: any) => {
		validate((e.target as HTMLInputElement).value);
	};

	return (
		<Modal isOpen={isOpen} onOutsideClick={() => hide()}>
			<form id="mw-link-modal" onSubmit={handleSubmit} onReset={handleReset}>
				<div className="mw-modal--header">
					<h1>Link</h1>
				</div>

				<div id="mw-modal--body">
					<div
						className={`flex--item ${
							hrefInputRef.current?.value === ""
								? ""
								: isValid
								? "has-success"
								: "has-error"
						}`}
					>
						<label htmlFor="link-editor-href-input" className="s-label mb4">
							{_t("link_editor.href_label")}
						</label>
						<input
							id="link-editor-href-input"
							className="s-input"
							type="text"
							name="href"
							defaultValue={href}
							aria-describedby="link-editor-href-error"
							ref={hrefInputRef}
							onInput={handleHrefInput}
						/>
						<p
							id="link-editor-href-message"
							className="s-input-message mt4"
							ref={hrefMessageRef}
						>
							{isValid
								? _t("link_editor.validation_success")
								: _t("link_editor.validation_error")}
						</p>
					</div>

					<div className="flex--item">
						<label htmlFor="link-editor-text-input" className="s-label mb4">
							{_t("link_editor.text_label")}
						</label>
						<input
							id="link-text-href-input"
							className="s-input"
							type="text"
							defaultValue={text}
							name="text"
							ref={textInputRef}
						/>
					</div>
				</div>

				<div className="mw-modal--footer d-flex py8 jc-space-between ai-center sm:fd-column sm:ai-start sm:g16">
					<div>
						<button
							className="s-btn s-btn__primary js-link-editor-save-btn"
							type="submit"
							disabled
							ref={saveBtnRef}
						>
							{_t("link_editor.save_button")}
						</button>
						<button className="s-btn" type="reset">
							{_t("link_editor.cancel_button")}
						</button>
					</div>
				</div>

				<button className="mw-btn mw-modal--close" onClick={() => destroy()}>
					<CloseIcon />
				</button>
			</form>
		</Modal>
	);
}
