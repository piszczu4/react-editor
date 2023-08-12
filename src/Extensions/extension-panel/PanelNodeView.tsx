import {
	NodeViewContent,
	NodeViewProps,
	NodeViewWrapper
} from "@tiptap/react";
import { TrashIcon } from "../../components";
import ErrorIcon from "../../components/Icons/ErrorIcon";
import InfoIcon from "../../components/Icons/InfoIcon";
import NoteIcon from "../../components/Icons/NoteIcon";
import SuccessIcon from "../../components/Icons/SuccessIcon";
import TipIcon from "../../components/Icons/TipIcon";
import WarningIcon from "../../components/Icons/WarningIcon";
import { PanelType } from "./panel";


function getIcon(panelType: PanelType) {
	return panelType === PanelType.INFO ? (
		<InfoIcon />
	) : panelType === PanelType.ERROR ? (
		<ErrorIcon />
	) : panelType === PanelType.NOTE ? (
		<NoteIcon />
	) : panelType === PanelType.SUCCESS ? (
		<SuccessIcon />
	) : panelType === PanelType.WARNING ? (
		<WarningIcon />
	) : (
		<TipIcon />
	);
}

function getColor(panelType: PanelType) {
	return panelType === PanelType.INFO
		? "rgb(233, 242, 255)"
		: panelType === PanelType.ERROR
		? "rgb(255, 237, 235)"
		: panelType === PanelType.NOTE
		? "rgb(243, 240, 255)"
		: panelType === PanelType.SUCCESS
		? "rgb(223, 252, 240)"
		: panelType === PanelType.WARNING
		? "rgb(255, 247, 214)"
		: "";
}

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

function PanelBubbleMenuContent({ editor }: { editor: any }) {
	return (
		<span>
			<div role="menu">
				<div className="mw-panel-bubble-menu d-flex ai-center">
					<button
						type="button"
						className="flex--item s-btn mr4"
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
						className="flex--item s-btn mr4"
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
						className="flex--item s-btn mr4"
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
						className="flex--item s-btn mr4"
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
						className="flex--item s-btn mr4"
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

					<button
						type="button"
						className="flex--item s-btn mr4"
						title=""
						onClick={() => {
							editor.chain().deleteNode("panel").run();
						}}
					>
						<TrashIcon />
					</button>
				</div>
			</div>
		</span>
	);
}

export function PanelNodeView({
	editor,
	node,
	updateAttributes,
	deleteNode,
}: NodeViewProps) {
	return (
		// <Tippy
		// 	className="mw-popover panel-node-view"
		// 	trigger="click"
		// 	animation="shift-toward-subtle"
		// 	hideOnClick={false}
		// 	content={<PanelBubbleMenuContent editor={editor} />}
		// 	interactive={true}
		// 	placement={"bottom"}
		// 	onClickOutside={(instance) => {
		// 		instance.hide();
		// 	}}
		// >
		<NodeViewWrapper
			as="div"
			className="mw-panel panel-bubble-menu"
			data-panel-type={node.attrs.panelType}
			style={{ backgroundColor: getColor(node.attrs.panelType) }}
		>
			<div
				className="mw-panel--icon"
				contentEditable={false}
				style={{ color: getIconColor(node.attrs.panelType) }}
			>
				{getIcon(node.attrs.panelType)}
			</div>
			<NodeViewContent className="mw-panel--content" />
		</NodeViewWrapper>
		// </Tippy>
	);
}
