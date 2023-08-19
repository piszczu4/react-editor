import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { IframeHTMLAttributes } from "react";
import { IframeNodeView } from "./IframeNodeView";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		iframe: {
			/**
			 * Add an iframe
			 */
			setIframe: (options: {
				src: string;
				width?: string;
				height?: string;
			}) => ReturnType;
		};
	}
}

export const Iframe = Node.create({
	name: "iframe",
	group: "block",
	selectable: true,
	draggable: true,
	atom: true,

	addAttributes() {
		return {
			src: {
				default: null,
				renderHTML: (attributes) => ({
					src: attributes.src,
				}),
				parseHTML: (element: HTMLIFrameElement) => element.src,
			},
			width: {
				default: "100%",
				parseHTML: (element: HTMLElement) => element.getAttribute("width"),
			},
			height: {
				default: "100%",
				parseHTML: (element: HTMLElement) => element.getAttribute("height"),
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "video",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ["iframe", mergeAttributes(HTMLAttributes)];
	},

	addCommands() {
		return {
			setIframe:
				(options) =>
				({ commands }) => {
					return commands.insertContent({ type: this.name, attrs: options });
				},
		};
	},

	addNodeView() {
		return ReactNodeViewRenderer(IframeNodeView);
	},
});
