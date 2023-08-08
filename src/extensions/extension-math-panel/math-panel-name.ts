import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { MediaNodeView } from "./MediaNodeView";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {}
}

export interface MediaOptions {
	HTMLAttributes: Record<string, any>;
}

export const MathPanelName = Node.create<MediaOptions>({
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
