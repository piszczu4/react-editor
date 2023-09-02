import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { PanelNodeView } from "./PanelNodeView";

import { TrashIcon } from "../../components/Icons";
import ErrorIcon from "../../components/Icons/ErrorIcon";
import InfoIcon from "../../components/Icons/InfoIcon";
import NoteIcon from "../../components/Icons/NoteIcon";
import SuccessIcon from "../../components/Icons/SuccessIcon";
import TipIcon from "../../components/Icons/TipIcon";
import WarningIcon from "../../components/Icons/WarningIcon";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		panel: {
			/**
			 * Set panel
			 */
			setPanel: (options: {
				panelType: PanelType;
				panelIcon?: string;
				panelIconId?: string;
				panelIconText?: string;
				panelColor?: string;
			}) => ReturnType;
		};
	}
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

export enum PanelType {
	INFO = "info",
	NOTE = "note",
	TIP = "tip",
	WARNING = "warning",
	ERROR = "error",
	SUCCESS = "success",
	CUSTOM = "custom",
}

type PanelOptions = {
	HTMLAttributes: Record<string, any>;
};
export const Panel = Node.create<PanelOptions, never>({
	name: "panel",
	content: "block+",
	group: "block",
	selectable: true,

	addOptions() {
		return {
			HTMLAttributes: {
				className: "mw-panel",
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "div[data-panel-type]",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		const contentAttrs: Record<string, string> = {
			"data-panel-content": "true",
			"className": "mw-panel--content",
			'style': ""
		};

		return [
			"div",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			["div", contentAttrs, 0],
		];
	},

	addNodeView() {
		return ReactNodeViewRenderer(PanelNodeView);
	},

	addAttributes() {
		return {
			panelType: {
				default: "info",
				renderHTML: (attributes) => ({
					"data-panel-type": attributes.panelType,
				}),
				parseHTML: (element: HTMLImageElement) =>
					element.getAttribute("data-panel-type"),
			},
			panelIcon: {
				default: null,
				renderHTML: (attributes) => ({
					"data-panel-icon": attributes.panelIcon,
				}),
				parseHTML: (element: HTMLImageElement) =>
					element.getAttribute("data-panel-icon"),
			},
			panelIconId: {
				default: null,
				renderHTML: (attributes) => ({
					"data-panel-icon-id": attributes.panelIconId,
				}),
				parseHTML: (element: HTMLImageElement) =>
					element.getAttribute("data-panel-icon-id"),
			},
			panelIconText: {
				default: null,
				renderHTML: (attributes) => ({
					"data-panel-icon-text": attributes.panelIconText,
				}),
				parseHTML: (element: HTMLImageElement) =>
					element.getAttribute("data-panel-icon-text"),
			},
			panelColor: {
				default: null,
				renderHTML: (attributes) => ({
					"data-panel-color": attributes.panelColor,
				}),
				parseHTML: (element: HTMLImageElement) =>
					element.getAttribute("data-panel-color"),
			},
		};
	},

	addCommands() {
		return {
			setPanel:
				(options) =>
				({ chain }) => {
					return chain()
						.insertContent({
							type: this.name,
							attrs: options,
							content: [
								{
									type: "paragraph",
								},
							],
						})
						.run();
				},
		};
	},
});
