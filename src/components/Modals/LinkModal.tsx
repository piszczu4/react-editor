import { EditorView } from "@tiptap/pm/view";
import { Editor, selectionToInsertionEnd } from "@tiptap/react";
import { TextSelection } from "prosemirror-state";
import { useEffect, useRef, useState } from "react";
import { _t } from "../../helpers/strings";
import { Modal } from "../Modal";
import { getMarkRange } from "@tiptap/react";

import { validateLink } from "../../utils";
import CloseIcon from "../Icons/CloseIcon";

type Props = {
	isOpen: boolean;
	hide: () => void;
	destroy: () => void;
	editor: Editor;
};

export function LinkModal({ isOpen, hide, destroy, editor }: Props) {
	let href: string = "";
	let text: string = "";
	if (editor.isActive("link")) {
		let attrs = editor.getAttributes("link");
		href = attrs["href"];
		let linkRange = getMarkRange(
			editor.state.selection.$from,
			editor.state.schema.marks.link
		)!;
		text = editor.state.doc.textBetween(linkRange.from, linkRange.to);
	} else if (!editor.state.selection.empty) {
		text = editor?.state.doc.textBetween(
			editor.state.selection.from,
			editor.state.selection.to
		);
	}

	let [_href, setHref] = useState(href);
	let [isValid, setIsValid] = useState(false);

	let textInputRef = useRef<HTMLInputElement>(null);

	let validate = (href: string) => {
		setIsValid(validateLink(href));
	};

	let handleSave = () => {
		destroy();

		editor
			.chain()
			.focus()
			.command(({ tr, state }) => {
				const text = textInputRef.current!.value || _href;
				let mark = state.schema.marks.link.create({ href: _href });
				const node = editor.state.schema.text(text!, [mark]);

				let range = getMarkRange(tr.selection.$from, state.schema.marks.link)!;
				if (range) {
					tr = tr.setSelection(
						TextSelection.create(tr.doc, range.from, range.to)
					);
					// drop any link marks that might already exist
					tr = tr.removeMark(
						tr.selection.from,
						tr.selection.to,
						state.schema.marks.link
					);
				}
				tr = tr.replaceSelectionWith(node, false);
				return true;
			})
			.run();
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		handleSave();
	};

	const handleCancel = () => {
		destroy();
		editor.commands.focus();
	};

	const handleHrefInput = (e: any) => {
		let value = (e.target as HTMLInputElement).value;
		setHref(value);
		validate(value);
	};

	useEffect(() => {
		validate(href);
	}, [href]);

	return (
		<Modal isOpen={isOpen} onOutsideClick={handleCancel}>
			<form id="mw-link-modal" onSubmit={handleSubmit} onReset={handleCancel}>
				<div className="mw-modal--header">
					<h1>Link</h1>
				</div>

				<div id="mw-modal--body">
					<div
						className={`flex--item ${
							_href === "" ? "" : isValid ? "has-success" : "has-error"
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
							onInput={handleHrefInput}
						/>
						<p id="link-editor-href-message" className="s-input-message mt4">
							{_href === ""
								? _t("link_editor.validation_info")
								: isValid
								? _t("link_editor.validation_success")
								: _t("link_editor.validation_error")}
						</p>
					</div>

					<div className="flex--item">
						<label htmlFor="link-editor-text-input" className="s-label mb4">
							{_t("link_editor.text_label")}
						</label>
						<input
							ref={textInputRef}
							id="link-text-href-input"
							className="s-input"
							type="text"
							defaultValue={text}
							name="text"
						/>
					</div>
				</div>

				<div className="mw-modal--footer d-flex py8 jc-space-between ai-center sm:fd-column sm:ai-start sm:g16">
					<div>
						<button
							className="s-btn s-btn__primary js-link-editor-save-btn"
							type="submit"
							disabled={!isValid}
						>
							{_t("link_editor.save_button")}
						</button>
						<button className="s-btn" type="reset" onClick={handleCancel}>
							{_t("link_editor.cancel_button")}
						</button>
					</div>
				</div>

				<button className="mw-btn mw-modal--close" onClick={handleCancel}>
					<CloseIcon />
				</button>
			</form>
		</Modal>
	);
}
