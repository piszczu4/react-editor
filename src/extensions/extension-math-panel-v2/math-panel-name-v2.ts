import { mergeAttributes, Node } from "@tiptap/core";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {}
}

export interface MathPanelNameOptions {
	HTMLAttributes: Record<string, any>;
}

export const MathPanelNameV2 = Node.create<MathPanelNameOptions>({
	name: "mathPanelNameV2",

	inline: false,

	group: "block",

	draggable: false,

	content: "paragraph|heading",

	selectable: true,

	addOptions() {
		return {
			HTMLAttributes: { class: "mw-math-panel-v2--name" },
		};
	},

	parseHTML() {
		return [
			{
				tag: "div.mw-math-panel-v2--name",
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

	// addNodeView() {
	// 	return ReactNodeViewRenderer(MediaNodeView);
	// },
});
