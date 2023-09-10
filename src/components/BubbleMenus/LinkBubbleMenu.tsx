import { useState } from "react";

import { useRef } from "react";
import { _t } from "../../helpers/strings";

import { BubbleMenu, Editor } from "@tiptap/react";
import { findNode } from "../../utils";

import "tippy.js/dist/svg-arrow.css";

import { getMarkAttributes } from "@tiptap/react";
import { EditIcon, TrashIcon } from "../Icons";
import { LinkModal } from "../Modals/LinkModal";

type LinkBubbleMenuProps = {
	editor: Editor;
	href: string;
};

export function LinkBubbleMenu({ editor }: LinkBubbleMenuProps) {
	let ref = useRef<any>(null);
	const linkAttrs = getMarkAttributes(editor.state, "link");

	let [isOpen, setIsOpen] = useState(false);
	let [exists, setExists] = useState(false);

	let handleEdit = () => {
		setExists(true);
		setIsOpen(true);
		return true;
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
				<div id="link-tooltip-popover" role="menu">
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
							onClick={() => editor.chain().focus().unsetLink().run()}
						>
							<TrashIcon />
						</button>

						{exists && (
							<LinkModal
								editor={editor}
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
