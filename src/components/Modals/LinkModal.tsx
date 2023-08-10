import ReactDOM from "react-dom";

import { EditorView } from "@tiptap/pm/view";
import { TextSelection } from "prosemirror-state";
import { _t } from "../../helpers/strings";
import { hideModal } from "@stackoverflow/stacks";
import { useEffect, useRef } from "react";
import { Modal } from "../Modal";
import { Editor } from "@tiptap/react";

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
	let hrefErrorRef = useRef<HTMLParagraphElement>(null);

	let validate = (href: string) => {
		const valid = stackOverflowValidateLink(href);
		if (!valid) {
			showValidationError(_t("link_editor.validation_error"));
		} else {
			hideValidationError();
		}
		saveBtnRef.current!.disabled = !valid;
		return valid;
	};

	let showValidationError = (errorMessage: string) => {
		const parent = hrefInputRef.current!.parentElement;
		const error = hrefErrorRef.current;
		parent!.classList.add("has-error");
		error!.textContent = errorMessage;
		error!.classList.remove("d-none");
	};

	let hideValidationError = () => {
		const parent = hrefInputRef.current!.parentElement;
		const error = hrefErrorRef.current;
		parent!.classList.remove("has-error");
		error!.textContent = "";
		error!.classList.add("d-none");
	};

	let resetEditor = () => {
		hrefInputRef.current!.value = "";
		textInputRef.current!.value = "";
		hideValidationError();
	};

	let handleSave = (view: EditorView) => {
		const href = hrefInputRef.current!.value;
		if (!validate(href!)) {
			return;
		}
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

	// let modal = (
	// 	<div className="s-modal--dialog">
	// 		<form
	// 			ref={ref}
	// 			id="link-editor-form"
	// 			className="mt6 bc-black-400 js-link-editor"
	// 		>
	// 			<div className="d-flex fd-column gsy gs8 p12">
	// 				<div className="flex--item">
	// 					<label htmlFor="link-editor-href-input" className="s-label mb4">
	// 						{_t("link_editor.href_label")}
	// 					</label>
	// 					<input
	// 						id="link-editor-href-input"
	// 						className="s-input js-link-editor-href"
	// 						type="text"
	// 						name="href"
	// 						defaultValue={href}
	// 						aria-describedby="link-editor-href-error"
	// 						ref={hrefInputRef}
	// 					/>
	// 					<p
	// 						id="link-editor-href-error"
	// 						className="s-input-message mt4 d-none js-link-editor-href-error"
	// 						ref={hrefErrorRef}
	// 					></p>
	// 				</div>

	// 				<div className="flex--item">
	// 					<label htmlFor="link-editor-text-input" className="s-label mb4">
	// 						{_t("link_editor.text_label")}
	// 					</label>
	// 					<input
	// 						id="link-text-href-input"
	// 						className="s-input js-link-editor-text"
	// 						type="text"
	// 						defaultValue={text}
	// 						name="text"
	// 						ref={textInputRef}
	// 					/>
	// 				</div>

	// 				<div className="flex--item">
	// 					<button
	// 						className="s-btn s-btn__primary js-link-editor-save-btn"
	// 						type="submit"
	// 						disabled
	// 						ref={saveBtnRef}
	// 					>
	// 						{_t("link_editor.save_button")}
	// 					</button>
	// 					<button className="s-btn" type="reset">
	// 						{_t("link_editor.cancel_button")}
	// 					</button>
	// 				</div>
	// 			</div>
	// 		</form>
	// 	</div>
	// );

	return (
		<Modal isOpen={isOpen} onOutsideClick={() => hide()}>
			<form id="mw-link-modal" onSubmit={handleSubmit} onReset={handleReset}>
				<div className="mw-modal--header">
					<h1>Link</h1>
				</div>

				<div id="mw-modal--body">
					<div className="flex--item">
						<label htmlFor="link-editor-href-input" className="s-label mb4">
							{_t("link_editor.href_label")}
						</label>
						<input
							id="link-editor-href-input"
							className="s-input js-link-editor-href"
							type="text"
							name="href"
							defaultValue={href}
							aria-describedby="link-editor-href-error"
							ref={hrefInputRef}
							onInput={handleHrefInput}
						/>
						<p
							id="link-editor-href-error"
							className="s-input-message mt4 d-none js-link-editor-href-error"
							ref={hrefErrorRef}
						></p>
					</div>

					<div className="flex--item">
						<label htmlFor="link-editor-text-input" className="s-label mb4">
							{_t("link_editor.text_label")}
						</label>
						<input
							id="link-text-href-input"
							className="s-input js-link-editor-text"
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
