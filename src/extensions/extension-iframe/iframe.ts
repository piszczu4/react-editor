import { Node, mergeAttributes } from "@tiptap/core";
import { IframeHTMLAttributes } from "react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		iframe: {
			/**
			 * Add an iframe
			 */
			setIframe: (options: {
				src: string;
				width?: string;
				height?: number;
			}) => ReturnType;
		};
	}
}

export const Iframe = Node.create({
	name: "video",
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
				default: "640",
				parseHTML: (element: HTMLElement) => element.getAttribute("width"),
			},
			height: {
				default: "auto",
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
		return ["video", mergeAttributes(HTMLAttributes)];
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
		return ({ editor, node }) => {
			const div = document.createElement("div");
			div.className =
				"video-container" + (editor.isEditable ? " cursor-pointer" : "");
			const iframe = document.createElement("iframe");
			// if (editor.isEditable) {
			// 	iframe.className = "pointer-events-none";
			// }
			iframe.width = node.attrs.width;
			iframe.height = node.attrs.height;
			iframe.allowFullscreen = true;
			iframe.src = node.attrs.src;
			div.append(iframe);
			return {
				dom: div,
			};
		};
	},
});
