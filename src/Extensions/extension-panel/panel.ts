import { mergeAttributes, Node } from "@tiptap/core";

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

	addOptions() {
		return {
			HTMLAttributes: {
				class: "mw-panel",
			},
		};
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
		};
	},

	parseHTML() {
		return [
			{
				tag: "div[data-panel-type]",
			},
		];
	},

	renderHTML({ HTMLAttributes, node }) {
		const contentAttrs: Record<string, string> = {
			class: "mw-panel--content",
		};

		return [
			"div",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			["div", {}, ["i", { class: `mw-panel--icon ${node.attrs.panelType}` }]],
			["div", contentAttrs, 0],
		];
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
