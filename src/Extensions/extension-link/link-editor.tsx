import React from "react";
import ReactDOM from "react-dom";

import { EditorView } from "@tiptap/pm/view";
import { TextSelection } from "prosemirror-state";
import { _t } from "../../helpers/strings";

import { hideModal, showModal } from "@stackoverflow/stacks";
import { validateLink } from "../../utils";
type Props = {
	view: EditorView;
	href: string;
	title: string;
};

export class LinkEditor extends React.Component {
	hrefInput: HTMLInputElement | null = null;
	textInput: HTMLInputElement | null = null;
	saveBtn: HTMLButtonElement | null = null;
	hrefError: HTMLParagraphElement | null = null;
	view: EditorView | null = null;

	title: string = "";
	href: string = "";
	validateLink: any;

	constructor(props: Props) {
		super(props);
		this.validateLink = validateLink;
		this.view = props.view;
		this.title = props.title;
		this.href = props.href;
	}

	render(): React.ReactNode {
		let editor = (
			<div className="s-modal--dialog">
				{ReactDOM.createPortal(
					<button>siemka</button>,
					document.getElementById("test-container") as HTMLElement
				)}

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						this.handleSave(this.view!);
						this.hideModal();
					}}
					onReset={(e) => {
						e.preventDefault();
						e.stopPropagation();
						this.hideModal();
					}}
					id="link-editor-form"
					className="mt6 bc-black-400 js-link-editor"
				>
					<div className="d-flex fd-column gsy gs8 p12">
						<div className="flex--item">
							<label htmlFor="link-editor-href-input" className="s-label mb4">
								{_t("link_editor.href_label")}
							</label>
							<input
								onInput={(e) =>
									this.validate((e.target as HTMLInputElement).value)
								}
								id="link-editor-href-input"
								className="s-input js-link-editor-href"
								type="text"
								name="href"
								defaultValue={this.href}
								aria-describedby="link-editor-href-error"
								ref={(c) => (this.hrefInput = c)}
							/>
							<p
								id="link-editor-href-error"
								className="s-input-message mt4 d-none js-link-editor-href-error"
								ref={(c) => (this.hrefError = c)}
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
								defaultValue={this.title}
								name="text"
								ref={(c) => (this.textInput = c)}
							/>
						</div>

						<div className="flex--item">
							<button
								className="s-btn s-btn__primary js-link-editor-save-btn"
								type="submit"
								disabled
								ref={(c) => (this.saveBtn = c)}
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

		return ReactDOM.createPortal(
			editor,
			document.getElementById("link-editor")!
		);
	}

	hideModal() {
		hideModal(document.querySelector("#modal-base") as HTMLElement);
	}

	showModal() {
		showModal(document.querySelector("#modal-base") as HTMLElement);
	}

	componentDidMount(): void {
		ReactDOM.findDOMNode(this)?.addEventListener("submit", (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.handleSave(this.view!);
		});

		ReactDOM.findDOMNode(this)?.addEventListener("reset", (e) => {
			e.preventDefault();
			e.stopPropagation();
			// const tr = this.tryHideInterfaceTr(view.state);
			// if (tr) {
			//     this.view!.dispatch(tr);
			// }
		});

		ReactDOM.findDOMNode(this)?.addEventListener("reset", (e) => {
			e.preventDefault();
			e.stopPropagation();
			// const tr = this.tryHideInterfaceTr(view.state);
			// if (tr) {
			//     this.view!.dispatch(tr);
			// }
		});

		this.hrefInput!.addEventListener("input", (e) => {
			this.validate((e.target as HTMLInputElement).value);
		});
	}

	validate(href: string) {
		const valid = this.validateLink(href);
		if (!valid) {
			this.showValidationError(_t("link_editor.validation_error"));
		} else {
			this.hideValidationError();
		}
		this.saveBtn!.disabled = !valid;
		return valid;
	}

	showValidationError(errorMessage: string) {
		const parent = this.hrefInput?.parentElement;
		const error = this.hrefError;
		parent!.classList.add("has-error");
		error!.textContent = errorMessage;
		error!.classList.remove("d-none");
	}
	hideValidationError() {
		const parent = this.hrefInput!.parentElement;
		const error = this.hrefError;
		parent!.classList.remove("has-error");
		error!.textContent = "";
		error!.classList.add("d-none");
	}

	handleSave(view: EditorView) {
		const href = this.hrefInput?.value;
		if (!this.validate(href!)) {
			return;
		}
		const text = this.textInput!.value || href;
		const node = view.state.schema.text(text!, []);
		// let tr =
		// 	this.tryHideInterfaceTr(view.state, {
		// 		url: null,
		// 		text: null,
		// 	}) || view.state.tr;
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
			view.state.schema.marks.link.create({ href })
		);
		view.dispatch(tr);
	}

	resetEditor() {
		this.hrefInput!.value = "";
		this.textInput!.value = "";
		this.hideValidationError();
	}
}

export class LinkTooltip extends React.Component {
	editButton: HTMLButtonElement | null = null;
	removeButton: HTMLButtonElement | null = null;
	link: HTMLAnchorElement | null = null;

	href: string = "";

	render() {
		const popoverId = "link-tooltip-popover";

		return (
			<span
				className="w0"
				aria-controls={popoverId}
				data-controller="s-popover"
				data-s-popover-placement="bottom"
			>
				<div
					id={popoverId}
					className="s-popover is-visible p4 w-auto wmx-initial wmn-initial js-link-tooltip"
					role="menu"
				>
					<div className="s-popover--arrow"></div>
					<div className="d-flex ai-center">
						<a
							href={this.href}
							className="wmx3 flex--item fs-body1 fw-normal truncate ml8 mr4"
							target="_blank"
							rel="nofollow noreferrer"
						>
							{this.href}
						</a>

						<button
							type="button"
							className="flex--item s-btn mr4 js-link-tooltip-edit"
							title={_t("link_tooltip.edit_button_title")}
						>
							<span className="svg-icon-bg iconPencilSm"></span>
						</button>

						<button
							type="button"
							className="flex--item s-btn js-link-tooltip-remove"
							title={_t("link_tooltip.remove_button_title")}
						>
							<span className="svg-icon-bg iconTrashSm"></span>
						</button>
					</div>
				</div>
			</span>
		);
	}
}
