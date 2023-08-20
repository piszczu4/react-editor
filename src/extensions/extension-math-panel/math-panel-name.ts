import { mergeAttributes, Node } from "@tiptap/core";


declare module "@tiptap/core" {
	interface Commands<ReturnType> {}
}

export interface MathPanelNameOptions {
	HTMLAttributes: Record<string, any>;
}

export const MathPanelName = Node.create<MathPanelNameOptions>({
	name: "mathPanelName",

	inline: false,

	group: "block",

	draggable: false,

	content: "paragraph",

	selectable: true,

	addOptions() {
		return {
			HTMLAttributes: { class: "mw-math-panel--name" },
		};
	},

	parseHTML() {
		return [
			{
				tag: "div.mw-math-panel--name",
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
