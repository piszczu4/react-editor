import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		mathPanelBody: {};
	}
}

export interface MediaOptions {
	HTMLAttributes: Record<string, any>;
}

export const MathPanelBody = Node.create<MediaOptions>({
	name: "mathPanelBody",

	inline: false,

	group: "block",

	draggable: false,

	content: "block+",

	code: true,

	selectable: true,

	addOptions() {
		return {
			HTMLAttributes: { class: "mw-math-panel--body" },
		};
	},

	parseHTML() {
		return [
			{
				tag: "div.mw-math-panel--body",
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
});
