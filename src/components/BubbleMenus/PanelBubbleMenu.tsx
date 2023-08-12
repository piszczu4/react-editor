import { Editor } from "@tiptap/react";
import { PanelType } from "../../extensions/extension-panel/panel";
import { BubbleMenu } from "@tiptap/react";

import InfoIcon from "../../components/Icons/InfoIcon";
import ErrorIcon from "../../components/Icons/ErrorIcon";
import NoteIcon from "../../components/Icons/NoteIcon";
import SuccessIcon from "../../components/Icons/SuccessIcon";
import WarningIcon from "../../components/Icons/WarningIcon";
import { TrashIcon } from "../../components";
import { findNodePos } from "../../utils";

function getIconColor(panelType: PanelType) {
	return panelType === PanelType.INFO
		? "#1D7AFC"
		: panelType === PanelType.ERROR
		? "#E34935"
		: panelType === PanelType.NOTE
		? "#8270DB"
		: panelType === PanelType.SUCCESS
		? "#22A06B"
		: panelType === PanelType.WARNING
		? "#D97008"
		: "";
}

type PanelBubbleMenuProps = { editor: any };

export function PanelBubbleMenu({ editor }: PanelBubbleMenuProps) {
	return (
		<BubbleMenu
			className="mw-popover"
			pluginKey={"panelBubbleMenu"}
			editor={editor}
			tippyOptions={{
				duration: 200,
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
				hideOnClick: false,
				interactive: true,
				placement: "bottom",
				onClickOutside: (instance) => {
					instance.hide();
				},
				getReferenceClientRect: () => {
					let pos = findNodePos(editor, "panel");
					let closestNode = editor.view.nodeDOM(pos) as HTMLElement;
					return closestNode.getBoundingClientRect();
				},
			}}
			shouldShow={(props) => {
				return props.editor.isActive("panel");
			}}
		>
			<div className="d-flex ai-center">
				<button
					type="button"
					className="flex--item mw-btn mr4"
					title=""
					onClick={() => {
						editor
							.chain()
							.focus()
							.updateAttributes("panel", {
								panelType: PanelType.INFO,
							})
							.run();
					}}
				>
					<InfoIcon color={getIconColor(PanelType.INFO)} />
				</button>

				<button
					type="button"
					className="flex--item mw-btn mr4"
					title=""
					onClick={() => {
						editor
							.chain()
							.focus()
							.updateAttributes("panel", {
								panelType: PanelType.NOTE,
							})
							.run();
					}}
				>
					{" "}
					<NoteIcon color={getIconColor(PanelType.NOTE)} />
				</button>
				<button
					type="button"
					className="flex--item mw-btn mr4"
					title=""
					onClick={() => {
						editor
							.chain()
							// .focus()
							.updateAttributes("panel", {
								panelType: PanelType.SUCCESS,
							})
							.run();
					}}
				>
					<SuccessIcon color={getIconColor(PanelType.SUCCESS)} />
				</button>

				<button
					type="button"
					className="flex--item mw-btn mr4"
					title=""
					onClick={() => {
						editor
							.chain()
							// .focus()
							.updateAttributes("panel", {
								panelType: PanelType.WARNING,
							})
							.run();
					}}
				>
					<WarningIcon color={getIconColor(PanelType.WARNING)} />
				</button>

				<button
					type="button"
					className="flex--item mw-btn mr4"
					title=""
					onClick={() => {
						editor
							.chain()
							// .focus()
							.updateAttributes("panel", {
								panelType: PanelType.ERROR,
							})
							.run();
					}}
				>
					<ErrorIcon color={getIconColor(PanelType.ERROR)} />
				</button>

				<span className="mw-separator"></span>

				<button
					type="button"
					className="flex--item mw-btn mr4"
					title=""
					onClick={() => {
						editor.chain().deleteNode("panel").run();
					}}
				>
					<TrashIcon />
				</button>
			</div>
		</BubbleMenu>
	);
}
