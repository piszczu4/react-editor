import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { FigureNodeView } from "./FigureNodeView";
import { ImageNodeView } from "../extension-image/ImageNodeView";
import { findClosestNode } from "../../utils";
import { createTable } from "@tiptap/extension-table";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		figure: {
			setFigure: (options: {
				src?: string;
				alt?: string;
				title?: string;
				width?: string;
				height?: string;
				dataAlign?: string;
				dataFloat?: string;
				caption?: boolean;
			}) => ReturnType;
			setTable: () => ReturnType;
			setVideo: (options: {
				src: string;
				width: string;
				height: string;
			}) => ReturnType;

			toggleCaption: () => ReturnType;
		};
	}
}

export interface FigureOptions {
	HTMLAttributes: Record<string, any>;
}

export const Figure = Node.create<FigureOptions>({
	name: "figure",

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

	content: "(image|table|iframe) caption?",

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
			caption: {
				default: false,
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-caption"),
			},
		};
	},

	addCommands() {
		return {
			setFigure:
				(options) =>
				({ chain }) => {
					return chain()
						.insertContent({
							type: this.name,
							attrs: options,
							content: [
								{ type: "image", attrs: options },
								{
									type: "caption",
									attrs: { caption: true },
									content: [
										{
											type: "paragraph",
											text: "Caption",
										},
									],
								},
							],
						})
						.run();
				},

			setVideo:
				(options) =>
				({ chain }) => {
					return chain()
						.insertContent({
							type: this.name,
							attrs: options,
							content: [{ type: "iframe", attrs: options }],
						})
						.run();
				},
			setTable:
				() =>
				({ editor, chain }) => {
					let figure = editor.schema.nodes.figure;
					let table = createTable(editor.schema, 3, 3, false);
					let caption = editor.schema.nodes.caption.create();
					let figureNode = figure.create({}, [table, caption]);

					editor.view.dispatch(
						editor.state.tr.replaceSelectionWith(figureNode).scrollIntoView()
					);
					return true;
				},
			toggleCaption:
				() =>
				({ editor }) => {
					let { caption } = editor.getAttributes("figure");
					let imagePos = findClosestNode(editor, "image") as number;
					if (caption)
						return editor
							.chain()
							.focus()
							.updateAttributes("figure", {
								caption: !caption,
							})
							.setNodeSelection(imagePos)
							.run();
					else {
						let captionPos = findClosestNode(editor, "caption") as number;

						return editor
							.chain()
							.focus()
							.updateAttributes("figure", {
								caption: !caption,
							})
							.setTextSelection(captionPos + 1)
							.run();
					}

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
		return ReactNodeViewRenderer(FigureNodeView);
	},
});
