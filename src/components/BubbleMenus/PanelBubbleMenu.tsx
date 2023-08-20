import { BubbleMenu } from "@tiptap/react";
import { PanelType } from "../../extensions/extension-panel/panel";

import { TrashIcon } from "../../components/Icons";
import ErrorIcon from "../../components/Icons/ErrorIcon";
import InfoIcon from "../../components/Icons/InfoIcon";
import NoteIcon from "../../components/Icons/NoteIcon";
import SuccessIcon from "../../components/Icons/SuccessIcon";
import WarningIcon from "../../components/Icons/WarningIcon";
import { _t } from "../../helpers/strings";
import { findNode } from "../../utils";
import { MenuButton } from "../MenuBar/MenuButton";

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
			pluginKey={"panelBubbleMenu"}
			editor={editor}
			tippyOptions={{
				maxWidth: "100%",
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
					let nodeWithPos = findNode(editor, "panel")!;
					let node = editor.view.nodeDOM(nodeWithPos.pos) as HTMLElement;
					return node.getBoundingClientRect();
				},
			}}
			shouldShow={(props) => {
				return props.editor.isActive("panel");
			}}
		>
			<div className="mw-bbm--panel d-flex ai-center">
				<MenuButton
					icon={
						<InfoIcon
							className="mw-panel--info"
							color={getIconColor(PanelType.INFO)}
						/>
					}
					tooltip={_t("commands.panel.info")}
					command={() =>
						editor
							.chain()
							.focus()
							.updateAttributes("panel", {
								panelType: PanelType.INFO,
							})
							.run()
					}
					className="flex--item mw-btn mr4"
				/>

				<MenuButton
					icon={<NoteIcon color={getIconColor(PanelType.NOTE)} />}
					tooltip={_t("commands.panel.note")}
					command={() =>
						editor
							.chain()
							.focus()
							.updateAttributes("panel", {
								panelType: PanelType.NOTE,
							})
							.run()
					}
					className="flex--item mw-btn mr4"
				/>

				<MenuButton
					icon={<SuccessIcon color={getIconColor(PanelType.SUCCESS)} />}
					tooltip={_t("commands.panel.success")}
					command={() =>
						editor
							.chain()
							.focus()
							.updateAttributes("panel", {
								panelType: PanelType.SUCCESS,
							})
							.run()
					}
					className="flex--item mw-btn mr4"
				/>

				<MenuButton
					icon={<WarningIcon color={getIconColor(PanelType.WARNING)} />}
					tooltip={_t("commands.panel.warning")}
					command={() =>
						editor
							.chain()
							.focus()
							.updateAttributes("panel", {
								panelType: PanelType.WARNING,
							})
							.run()
					}
					className="flex--item mw-btn mr4"
				/>

				<MenuButton
					icon={<ErrorIcon color={getIconColor(PanelType.ERROR)} />}
					tooltip={_t("commands.panel.error")}
					command={() =>
						editor
							.chain()
							.focus()
							.updateAttributes("panel", {
								panelType: PanelType.ERROR,
							})
							.run()
					}
					className="flex--item mw-btn mr4"
				/>

				<span className="mw-separator"></span>

				<MenuButton
					icon={<TrashIcon className="mw-panel--delete" />}
					tooltip={_t("commands.panel.delete")}
					command={() => editor.chain().focus().deleteNode("panel").run()}
					className="flex--item mw-btn mr4"
				/>
			</div>
		</BubbleMenu>
	);
}
