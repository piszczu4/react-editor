import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { MediaNodeView } from "./MediaNodeView";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		media: {
			/**
			 * Set media
			 */
			SetMedia: (options: {
				"media-type": "img" | "video";
				src: string;
				alt?: string;
				title?: string;
				width?: string;
				height?: string;
				dataAlign?: string;
				dataFloat?: string;
				caption?: boolean;
			}) => ReturnType;
			/**
			 * Toggle caption
			 */
			toggleCaption: () => ReturnType;
			/**
			 * Rotate
			 */
			rotate: (deg: number, mode: "" | "-x" | "-y") => ReturnType;
		};
	}
}

export interface MediaOptions {
	HTMLAttributes: Record<string, any>;
}

export const Media = Node.create<MediaOptions>({
	name: "media",

	addOptions() {
		return {
			inline: false,
			allowBase64: false,
			HTMLAttributes: {},
		};
	},

	inline: false,

	group: "block",

	draggable: true,

	content: "paragraph",

	selectable: true,

	addAttributes() {
		return {
			src: {
				default: null,
				renderHTML: (attributes) => ({
					src: attributes.src,
				}),
				parseHTML: (element: HTMLImageElement) => element.src,
			},
			"media-type": {
				default: null,
				renderHTML: (attributes) => ({
					"data-media-type": attributes["media-type"],
				}),
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-media-type"),
			},
			alt: {
				default: null,
				parseHTML: (element: HTMLElement) => element.getAttribute("alt"),
			},
			title: {
				default: null,
				parseHTML: (element: HTMLElement) => element.getAttribute("title"),
			},
			width: {
				default: "75%",
				parseHTML: (element: HTMLElement) => element.getAttribute("width"),
			},
			height: {
				default: "auto",
				parseHTML: (element: HTMLElement) => element.getAttribute("height"),
			},
			dataAlign: {
				default: "center", // 'left' | 'center' | 'right'
				parseHTML: (element: HTMLElement) => element.getAttribute("data-align"),
			},
			dataFloat: {
				default: null, // 'left' | 'right'
				parseHTML: (element: HTMLElement) => element.getAttribute("data-float"),
			},
			"data-rotate": {
				default: null,
				renderHTML: ({ "data-rotate": rotate }) => ({
					"data-rotate": rotate,
					style: rotate ? `transform: rotate(${rotate}deg)` : null,
				}),
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-rotate"),
			},
			"data-rotate-x": {
				default: null,
				renderHTML: ({ "data-rotate-x": rotateX }) => ({
					"data-rotate-x": rotateX,
					style: rotateX ? `transform: rotateX(${rotateX}deg)` : null,
				}),
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-rotate-x"),
			},
			"data-rotate-y": {
				default: null,
			},
			caption: {
				default: false,
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-caption"),
			},
		};
	},

	addCommands() {
		return {
			SetMedia:
				(options) =>
				({ editor }) => {
					return editor.commands.insertContent({
						type: this.name,
						attrs: options,
						content: [
							{
								type: "paragraph",
								content: [
									{
										type: "text",
										text: "Caption",
									},
								],
							},
						],
					});
				},

			toggleCaption:
				() =>
				({ editor }) => {
					let { caption } = editor.getAttributes(this.name);
					return editor.commands.updateAttributes("caption", {
						caption: !caption,
					});

					// let { caption } = editor.getAttributes("resizableMediaWithCaption");
					// if (caption) {
					// 	editor
					// 		.chain()
					// 		.focus()
					// 		.deleteNode("caption")
					// 		.updateAttributes("resizableMediaWithCaption", {
					// 			caption: !caption,
					// 		})
					// 		.run();
					// } else {
					// 	// editor.commands.insertContent({
					// 	// 	type: "caption",
					// 	// 	content: [
					// 	// 		{
					// 	// 			type: "paragraph",
					// 	// 			content: [
					// 	// 				{
					// 	// 					type: "text",
					// 	// 					text: "Caption",
					// 	// 				},
					// 	// 			],
					// 	// 		},
					// 	// 	],
					// 	// });
					// 	return true;
					// }
				},

			rotate:
				(deg, mode) =>
				({ commands, editor }) => {
					let attr: string = `data-rotate${mode}`;
					let currDeg = editor.getAttributes(this.name)[attr];
					currDeg = currDeg ?? 0;
					let attrs: Record<string, any> = {};
					attrs[attr] = currDeg + deg;
					return commands.updateAttributes(this.name, attrs);
				},
		};
	},

	parseHTML() {
		return [
			{
				tag: "figure",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"figure",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addNodeView() {
		return ReactNodeViewRenderer(MediaNodeView);
	},
});
