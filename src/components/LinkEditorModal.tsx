import React, { useState } from "react";
import ReactDOM from "react-dom";

import { toggleMark } from "prosemirror-commands";
import { TextSelection } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { _t } from "../helpers/strings";
import { EditorView } from "@tiptap/pm/view";

import { useEffect, useRef } from "react";
import { hideModal, showModal } from "@stackoverflow/stacks";

import { BubbleMenu } from "@tiptap/react";
import { Editor } from "@tiptap/react";

import tippy, { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";

import { getMarkRange, getMarkAttributes } from "@tiptap/react";
import { stackOverflowValidateLink } from "../Extensions/extension-link/utils";

type LinkButtonProps = {
	view: EditorView;
};

export function LinkButton({ view }: LinkButtonProps) {
	let [isModalVisible, setIsModalVisible] = useState(false);
	return (
		<>
			<button
				onClick={() => {
					setIsModalVisible(true);
					showModal(document.querySelector("#modal-base") as HTMLElement);
				}}
			>
				Link
			</button>
			{}
			{isModalVisible && (
				<LinkEditorModal
					view={view}
					href=""
					text=""
					onClose={() => setIsModalVisible(false)}
				/>
			)}
		</>
	);
}

type Props = {
	view?: EditorView;
	href: string;
	text: string;
	onClose: any;
};

export function LinkEditorModal({ view, href, text, onClose }: Props) {
	let hide = () => {
		hideModal(document.querySelector("#modal-base") as HTMLElement);
		onClose();
	};

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

	useEffect(() => {
		const handleSubmit = (e: SubmitEvent) => {
			e.preventDefault();
			e.stopPropagation();
			handleSave(view!);
		};

		const handleReset = (e: Event) => {
			e.preventDefault();
			e.stopPropagation();
			resetEditor();
			hide();
		};

		const handleHrefInput = (e: Event) => {
			validate((e.target as HTMLInputElement).value);
		};

		ref.current!.addEventListener("submit", handleSubmit);
		ref.current!.addEventListener("reset", handleReset);
		hrefInputRef.current!.addEventListener("input", handleHrefInput);

		// return () => {
		// 	ref.current!.removeEventListener("submit", handleSubmit);
		// 	ref.current!.removeEventListener("reset", handleReset);
		// 	hrefInputRef.current!.removeEventListener("input", handleHrefInput);
		// };
	}, []);

	let modal = (
		<div className="s-modal--dialog">
			<form
				ref={ref}
				id="link-editor-form"
				className="mt6 bc-black-400 js-link-editor"
			>
				<div className="d-flex fd-column gsy gs8 p12">
					<h1>Link</h1>

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

					<div className="flex--item">
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
			</form>
		</div>
	);

	return ReactDOM.createPortal(modal, document.getElementById("link-editor")!);
}

type BubbleMenuProps = {
	editor: Editor;
	href: string;
};

export function LinkBubbleMenu({ editor, href }: BubbleMenuProps) {
	let ref = useRef<any>(null);
	let editButtonRef = useRef<any>(null);
	let removeButtonRef = useRef<any>(null);
	let linkRef = useRef<any>(null);

	const popoverId = "link-tooltip-popover";

	const linkAttrs = getMarkAttributes(editor.state, "link");

	let [isLinkEditorVisible, setIsLinkEditorVisible] = useState(false);
	let editLink = () => {
		setIsLinkEditorVisible(true);
		showModal(document.querySelector("#modal-base") as HTMLElement);
	};

	let unlink = () => {
		let pos = editor.state.selection.$anchor.pos;
		const range = getMarkRange(
			editor.state.doc.resolve(pos),
			editor.schema.marks.link
		);

		if (!range) return false;
		const $start = editor.state.doc.resolve(range.from);
		const $end = editor.state.doc.resolve(range.to);

		editor
			.chain()
			.focus()
			.setTextSelection(new TextSelection($start, $end))
			.unsetLink()
			.run();
	};

	return (
		<BubbleMenu
			pluginKey={"linkBubbleMenu"}
			editor={editor}
			tippyOptions={{ arrow: true }}
			shouldShow={(props) => {
				return props.editor.isActive("link");
			}}
			className="mw-5"
		>
			<span ref={ref}>
				<div id={popoverId} className="mw-popover" role="menu">
					<div className="d-flex ai-center">
						<a
							href={linkAttrs.href}
							className="wmx3 flex--item fs-body1 fw-normal truncate ml8 mr4"
							target="_blank"
							rel="nofollow noreferrer"
							title={linkAttrs.href}
						>
							{linkAttrs.href}
						</a>

						<button
							type="button"
							className="flex--item s-btn mr4 js-link-tooltip-edit"
							title={_t("link_tooltip.edit_button_title")}
							onClick={() => editLink()}
						>
							<span className="svg-icon-bg iconPencilSm"></span>
						</button>

						<button
							type="button"
							className="flex--item s-btn js-link-tooltip-remove"
							title={_t("link_tooltip.remove_button_title")}
							onClick={() => unlink()}
						>
							<span className="svg-icon-bg iconTrashSm"></span>
						</button>

						{isLinkEditorVisible && (
							<LinkEditorModal
								view={editor.view}
								href={linkAttrs.href}
								text={linkAttrs.text}
								onClose={() => setIsLinkEditorVisible(false)}
							/>
						)}
					</div>
				</div>
			</span>
		</BubbleMenu>
	);
}
