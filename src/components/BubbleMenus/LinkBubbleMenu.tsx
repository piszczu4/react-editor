import { useState } from "react";

import { TextSelection } from "prosemirror-state";
import { _t } from "../../helpers/strings";
import { showModal } from "@stackoverflow/stacks";
import { useRef } from "react";

import { BubbleMenu, Editor } from "@tiptap/react";
import { findNode, findNodePos } from "../../utils";

import "tippy.js/dist/svg-arrow.css";

import { getMarkAttributes, getMarkRange } from "@tiptap/react";
import { LinkModal } from "../Modals/LinkModal";
import { EditIcon, TrashIcon } from "../Icons";

type LinkBubbleMenuProps = {
	editor: Editor;
	href: string;
};

export function LinkBubbleMenu({ editor }: LinkBubbleMenuProps) {
	let ref = useRef<any>(null);
	const popoverId = "link-tooltip-popover";

	const linkAttrs = getMarkAttributes(editor.state, "link");

	let [isOpen, setIsOpen] = useState(false);
	let [exists, setExists] = useState(false);

	let handleEdit = () => {
		setExists(true);
		setIsOpen(true);
		return true;
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
			tippyOptions={{
				duration: 200,
				maxWidth: "100%",
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
				arrow: true,
				placement: "bottom",
				getReferenceClientRect: () => {
					let nodeWithPos = findNode(editor, "text");
					let node = editor.view.nodeDOM(nodeWithPos?.pos!) as HTMLElement;
					let range = document.createRange();
					range.selectNode(node);
					return range.getBoundingClientRect();
				},
			}}
			shouldShow={(props) => {
				return props.editor.isActive("link");
			}}
			className="mw-5"
		>
			<span ref={ref}>
				<div id={popoverId} role="menu">
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
							onClick={handleEdit}
						>
							<EditIcon />
						</button>

						<button
							type="button"
							className="flex--item s-btn js-link-tooltip-remove"
							title={_t("link_tooltip.remove_button_title")}
							onClick={() => unlink()}
						>
							<TrashIcon />
						</button>

						{exists && (
							<LinkModal
								editor={editor}
								href={linkAttrs.href}
								text={linkAttrs.text}
								isOpen={isOpen}
								destroy={() => setExists(false)}
								hide={() => setExists(false)}
							/>
						)}
					</div>
				</div>
			</span>
		</BubbleMenu>
	);
}
