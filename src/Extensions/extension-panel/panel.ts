import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { PanelNodeView } from "./PanelNodeView";

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
									content: [
										{
											type: "text",
											text: "Panel",
										},
									],
								},
							],
						})
						.run();
				},
		};
	},
});
