import React from "react";
import ReactDOM from "react-dom";

import { toggleMark } from "prosemirror-commands";
import { TextSelection } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { _t } from "../../helpers/strings";
import { EditorView } from "@tiptap/pm/view";

import { useEffect, useRef } from "react";
import { hideModal, showModal } from "@stackoverflow/stacks";
// rudimentary link validation that's roughly in line with what Stack Overflow's backend uses for validation
const validLinkRegex =
	/^((https?|ftp):\/\/|\/)[-a-z0-9+&@#/%?=~_|!:,.;()*[\]$]+$/;
const validMailtoRegex = /^mailto:[#-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+$/;
/**
 * Checks if a url is well-formed and passes Stack Overflow's validation checks
 * @param url The url to validate
 */
export function stackOverflowValidateLink(url: string) {
	const normalizedUrl =
		url === null || url === void 0 ? void 0 : url.trim().toLowerCase();
	return (
		validLinkRegex.test(normalizedUrl!) || validMailtoRegex.test(normalizedUrl!)
	);
}

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
		this.validateLink = stackOverflowValidateLink;
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

// /** Manages the decorations necessary for drawing the link editor tooltip */

// 		// never allow the popover to hide itself. It either exists visibly or not at all
// 		this.content.addEventListener("s-popover:hide", (e) => {
// 			e.preventDefault();
// 		});
// 		// don't bind the exact listener, call whatever is currently set on `this` at event time
// 		const removeListener = () => {
// 			this.removeListener.call(this);
// 		};
// 		const editListener = () => {
// 			this.editListener.call(this);
// 		};
// 		// hook up the click/keyboard events for the supporting buttons
// 		this.bindElementInteraction(this.removeButton, removeListener);
// 		this.bindElementInteraction(this.editButton, editListener);
// 		this.update(state);
// 	}

// 	render();

// 	/**
// 	 * Binds both a mousedown and selective keydown listener to replace the purposefully missing "click" event
// 	 * @param element The element to bind the events to
// 	 * @param callback The callback to run on mousedown/keydown
// 	 */
// 	bindElementInteraction(element, callback) {
// 		element.addEventListener("mousedown", (e) => {
// 			e.stopPropagation();
// 			e.preventDefault();
// 			callback.call(this, e);
// 		});
// 		element.addEventListener("keydown", (e) => {
// 			// allow the Tab key to keep doing its thing
// 			if (e.key === "Tab") {
// 				return;
// 			}
// 			// cancel all other keypresses
// 			e.stopPropagation();
// 			e.preventDefault();
// 			// enter/space should still fire the event as if clicked
// 			if (e.key === "Enter" || e.key === " ") {
// 				callback.call(this, e);
// 			}
// 		});
// 	}
// 	/**
// 	 * Updates the internal state / tooltip visuals based on the current editor state
// 	 * @param state the current state of the editor
// 	 */
// 	update(state) {
// 		if (!this.isLink(state)) {
// 			return;
// 		}
// 		const linkMarks = this.findMarksInSelection(state);
// 		if (linkMarks.length > 0) {
// 			this.href = linkMarks[0].attrs.href;
// 			const link = this.link;
// 			link.href = link.title = link.innerText = this.href;
// 		}
// 	}
// 	/**
// 	 * Gets the tooltip decoration from a new PluginState.apply call
// 	 * @param value The existing LinkTooltipState (with forceHideTooltip potentially set)
// 	 * @param newState The state after the transaction
// 	 */
// 	getDecorations(value, newState) {
// 		// if we're forced to hide the decorations, don't even attempt to create them
// 		if ("forceHideTooltip" in value && value.forceHideTooltip) {
// 			return DecorationSet.empty;
// 		}
// 		const marks = this.findMarksInSelection(newState);
// 		// if there are no marks in the current selection, then return empty
// 		if (!marks.length) {
// 			return DecorationSet.empty;
// 		}
// 		// always update the state, regardless of document changes (potential metadata changes can change tooltip visuals)
// 		this.update(newState);
// 		// create the widget tooltip via EditorView callback
// 		const decoration = Decoration.widget(
// 			newState.selection.from,
// 			(view) => {
// 				/* NOTE: This function runs on every transaction update */
// 				this.updateEventListeners(view);
// 				return this.content;
// 			},
// 			{
// 				// place the widget *before* the cursor so it isn't included in text selections
// 				side: -1,
// 				ignoreSelection: true,
// 				// cancel all events coming from inside this widget
// 				stopEvent: () => true,
// 			}
// 		);
// 		return DecorationSet.create(newState.doc, [decoration]);
// 	}
// 	/**
// 	 * Returns true if the focus event caused something in the content to be focused
// 	 * @param e The dispatched focus event
// 	 */
// 	hasFocus(e) {
// 		return this.content.contains(e.relatedTarget);
// 	}
// 	/**
// 	 * Find out if the current selection contains a link mark
// 	 * @param state The current editor state
// 	 */
// 	isLink(state) {
// 		const { from, $from, to, empty } = state.selection;
// 		if (!empty) {
// 			return state.doc.rangeHasMark(from, to, state.schema.marks.link);
// 		}
// 		return (
// 			state.schema.marks.link.isInSet(state.storedMarks || $from.marks()) !==
// 			undefined
// 		);
// 	}
// 	/**
// 	 * Expand the current selection to contain the entire link mark.
// 	 * This allows us to remove the link mark from the entire link in the document
// 	 * if the user didn't explicitly select a region to be toggled.
// 	 */
// 	expandSelection(state, tr) {
// 		const expanded = this.linkAround(state);
// 		tr = tr.setSelection(
// 			TextSelection.create(tr.doc, expanded.from, expanded.to)
// 		);
// 		return tr;
// 	}
// 	/**
// 	 * Gets the positions immediately before and after a link mark in the current selection
// 	 * @param state
// 	 */
// 	linkAround(state) {
// 		const $pos = state.selection.$from;
// 		const start = $pos.parent.childAfter($pos.parentOffset);
// 		if (!start.node) {
// 			return;
// 		}
// 		const link = findMarksInSet(start.node.marks, state.schema.marks.link)[0];
// 		if (!link) {
// 			return;
// 		}
// 		let startIndex = $pos.index();
// 		let startPos = $pos.start() + start.offset;
// 		while (
// 			startIndex > 0 &&
// 			link.isInSet($pos.parent.child(startIndex - 1).marks)
// 		) {
// 			startIndex -= 1;
// 			startPos -= $pos.parent.child(startIndex).nodeSize;
// 		}
// 		let endIndex = $pos.indexAfter();
// 		let endPos = startPos + start.node.nodeSize;
// 		while (
// 			endIndex < $pos.parent.childCount &&
// 			link.isInSet($pos.parent.child(endIndex).marks)
// 		) {
// 			endPos += $pos.parent.child(endIndex).nodeSize;
// 			endIndex += 1;
// 		}
// 		return { from: startPos, to: endPos };
// 	}
// 	/**
// 	 * Finds all marks in the current selection
// 	 * @param state The current editor state
// 	 */
// 	findMarksInSelection(state) {
// 		const linkMarks = [];
// 		const { to, from, $from, empty } = state.selection;
// 		if (empty) {
// 			return findMarksInSet($from.marks(), state.schema.marks.link);
// 		}
// 		if (to > from) {
// 			state.doc.nodesBetween(from, to, (node) => {
// 				linkMarks.push(findMarksInSet(node.marks, state.schema.marks.link));
// 			});
// 		}
// 		const returnValue = [];
// 		return returnValue.concat(...linkMarks);
// 	}
// 	/**
// 	 * Updates apply/delete button events with the current editor view
// 	 * @param view The current editor view
// 	 */
// 	updateEventListeners(view) {
// 		this.removeListener = () => {
// 			let state = view.state;
// 			if (view.state.selection.empty) {
// 				const tr = this.expandSelection(state, state.tr);
// 				state = view.state.apply(tr);
// 			}
// 			toggleMark(view.state.schema.marks.link)(state, view.dispatch.bind(view));
// 		};
// 		this.editListener = () => {
// 			let tr = view.state.tr;
// 			if (view.state.selection.empty) {
// 				tr = this.expandSelection(view.state, view.state.tr);
// 			}
// 			const state = view.state.apply(tr);
// 			const { from, to } = state.selection;
// 			const text = state.doc.textBetween(from, to);
// 			const href = this.findMarksInSelection(state)[0].attrs.href;
// 			tr =
// 				LINK_EDITOR_KEY.showInterfaceTr(state, {
// 					forceHideTooltip: true,
// 					url: href,
// 					text,
// 				}) || tr;
// 			view.dispatch(tr);
// 		};
// 	}
// }
// function tooltipIsShowing(linkDecos) {
// 	return linkDecos && linkDecos !== DecorationSet.empty;
// }
// /**
//  * A plugin view that shows a tooltip when selecting a link in rich-text mode.
//  * The tooltip shows the href attribute of the selected link and allows removing
//  * the link mark from the document. Clicking on the tooltip's edit button will launch
//  * a plugin view that allows editing the link's href and text.
//  *
//  * Note: This is not a _NodeView_ because when dealing with links, we're dealing with
//  * _marks_, not _nodes_.
//  */
// export const linkEditorPlugin = (features) =>
// 	new StatefulPlugin({
// 		key: LINK_EDITOR_KEY,
// 		state: {
// 			init(_, instance) {
// 				return {
// 					visible: false,
// 					linkTooltip: new LinkTooltip(instance),
// 					decorations: DecorationSet.empty,
// 					shouldShow: false,
// 				};
// 			},
// 			apply(tr, value, _, newState) {
// 				// check if force hide was set and add to value for getDecorations to use
// 				const meta = this.getMeta(tr) || value;
// 				if ("forceHideTooltip" in meta) {
// 					value.forceHideTooltip = meta.forceHideTooltip;
// 				}
// 				// update the linkTooltip and get the decorations
// 				const decorations = value.linkTooltip.getDecorations(value, newState);
// 				return Object.assign(Object.assign({}, meta), {
// 					forceHideTooltip:
// 						value.forceHideTooltip && tooltipIsShowing(decorations),
// 					linkTooltip: value.linkTooltip,
// 					decorations: decorations,
// 				});
// 			},
// 		},
// 		props: {
// 			decorations(state) {
// 				return this.getState(state).decorations || DecorationSet.empty;
// 			},
// 			handleDOMEvents: {
// 				/** Handle editor blur and close the tooltip if it isn't focused */
// 				blur(view, e) {
// 					const { linkTooltip, decorations } = LINK_EDITOR_KEY.getState(
// 						view.state
// 					);
// 					// if the editor blurs, but NOT because of the tooltip, hide the tooltip
// 					if (
// 						tooltipIsShowing(decorations) &&
// 						!view.hasFocus() &&
// 						!linkTooltip.hasFocus(e)
// 					) {
// 						view.dispatch(LINK_EDITOR_KEY.forceHideTooltipTr(view.state));
// 					}
// 					// always return false since we're not cancelling/handling the blur
// 					return false;
// 				},
// 			},
// 			/** Handle mod-click to open links in a new window */
// 			handleClick(view, pos, event) {
// 				const mark = findMarksInSet(
// 					view.state.doc.resolve(pos).marks(),
// 					view.state.schema.marks.link
// 				)[0];
// 				const modPressed =
// 					getPlatformModKey() === "Cmd" ? event.metaKey : event.ctrlKey;
// 				const handled = mark && modPressed;
// 				// a link was mod-clicked, so open it in a new window
// 				if (handled) {
// 					window.open(mark.attrs.href, "_blank");
// 				}
// 				return !!handled;
// 			},
// 		},
// 		view(editorView) {
// 			return new LinkEditor(editorView, features.validateLink);
// 		},
// 	});
// /**
//  * Dispatches a transaction to show the link editor with the given url and text filled in
//  * @param view The current editor view
//  * @param url The value to prefill the url input with
//  * @param text The value to prefill the text input with
//  */
// export function showLinkEditor(view, url, text) {
// 	const tr = LINK_EDITOR_KEY.showInterfaceTr(view.state, {
// 		url,
// 		text,
// 	});
// 	if (tr) {
// 		view.dispatch(tr);
// 	}
// }
// /**
//  * Dispatches a transaction to hide the link editor
//  * @param view The current editor view
//  */
// export function hideLinkEditor(view) {
// 	const tr = LINK_EDITOR_KEY.hideInterfaceTr(view.state, {
// 		url: null,
// 		text: null,
// 	});
// 	if (tr) {
// 		view.dispatch(tr);
// 	}
// }
// /**
//  * Finds all marks in a set that are of the given type
//  * @param marks The set of marks to search
//  * @param type The type of mark to find
//  */
// function findMarksInSet(marks, type) {
// 	return marks.filter((mark) => mark.type === type);
// }
