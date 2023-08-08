import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		mathPanel: {
			setMathPanel: (panelType: PanelType) => ReturnType;
		};
	}
}

export interface MediaOptions {
	HTMLAttributes: Record<string, any>;
}

export enum PanelType {
	DEFINITION = "definition",
	THEOREM = "theorem",
	EXAMPLE = "example",
	REMARK = "remark",
	PROOF = "proof",
	LEMMA = "lemma",
}

export const MathPanel = Node.create<MediaOptions>({
	name: "mathPanel",

	inline: false,

	group: "block",

	draggable: false,

	content: "mathPanelName mathPanelBody",

	code: true,

	selectable: true,

	addOptions() {
		return {
			HTMLAttributes: { class: "mw-math-panel" },
		};
	},

	parseHTML() {
		return [
			{
				tag: "div.mw-math-panel",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"div",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addAttributes() {
		return {
			panelType: {
				default: "definition",
				renderHTML: (attributes) => ({
					"data-math-panel-type": attributes.panelType,
				}),
				parseHTML: (element: HTMLImageElement) =>
					element.getAttribute("data-math-panel-type"),
			},
		};
	},

	addCommands() {
		return {
			setMathPanel:
				(panelType) =>
				({ chain }) => {
					return chain()
						.insertContent({
							type: this.name,
							attrs: { panelType: panelType },
							content: [
								{
									type: "mathPanelName",
									content: [
										{
											type: "paragraph",
											text: "",
										},
									],
								},
								{
									type: "mathPanelBody",
									content: [
										{
											type: "paragraph",
											text: "",
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
