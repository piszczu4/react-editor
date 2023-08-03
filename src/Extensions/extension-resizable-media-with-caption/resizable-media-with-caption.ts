// import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
// import { ReactNodeViewRenderer } from "@tiptap/react";

// import { ResizableMediaWithCaptionNodeView } from "./ResizableMediaWithCaptionNodeView";

// declare module "@tiptap/core" {
// 	interface Commands<ReturnType> {
// 		resizableMediaWithCapton: {
// 			/**
// 			 * Set media
// 			 */
// 			setMediaWithCaption: (options: {
// 				"media-type": "img" | "video";
// 				src: string;
// 				alt?: string;
// 				title?: string;
// 				width?: string;
// 				height?: string;
// 			}) => ReturnType;
// 			/**
// 			 * Toggle caption
// 			 */
// 			toggleCaption: () => ReturnType;
// 		};
// 	}
// }

// export interface MediaWithCaptionOptions {
// 	// inline: boolean, // we have floating support, so block is good enough
// 	// allowBase64: boolean, // we're not going to allow this
// 	HTMLAttributes: Record<string, any>;
// }

// export const ResizableMediaWithCaption = Node.create<MediaWithCaptionOptions>({
// 	name: "resizableMediaWithCaption",

// 	addOptions() {
// 		return {
// 			inline: false,
// 			allowBase64: false,
// 			HTMLAttributes: {},
// 		};
// 	},

// 	inline: false,

// 	group: "block",

// 	draggable: true,

// 	content: "resizableMedia caption*",

// 	selectable: true,

// 	addAttributes() {
// 		return {
// 			src: {
// 				default: null,
// 				renderHTML: (attributes) => ({
// 					src: attributes.src,
// 				}),
// 				parseHTML: (element: HTMLImageElement) => element.src,
// 			},
// 			"media-type": {
// 				default: null,
// 				renderHTML: (attributes) => ({
// 					"data-media-type": attributes["media-type"],
// 				}),
// 				parseHTML: (element: HTMLElement) =>
// 					element.getAttribute("data-media-type"),
// 			},
// 			alt: {
// 				default: null,
// 			},
// 			title: {
// 				default: null,
// 			},
// 			width: {
// 				default: null,
// 			},
// 			height: {
// 				default: "auto",
// 			},
// 			dataAlign: {
// 				default: "center", // 'left' | 'center' | 'right'
// 			},
// 			dataFloat: {
// 				default: null, // 'left' | 'right'
// 			},
// 			caption: {
// 				default: false,
// 			},
// 		};
// 	},

// 	addCommands() {
// 		return {
// 			setMediaWithCaption:
// 				(options) =>
// 				({ commands, editor }) => {
// 					return editor.commands.insertContent({
// 						type: "resizableMediaWithCaption",
// 						attrs: { caption: true },
// 						content: [
// 							{
// 								type: "resizableMedia",
// 								attrs: options,
// 							},
// 							{
// 								type: "caption",
// 								attrs: { caption: true },
// 								content: [
// 									{
// 										type: "paragraph",
// 										content: [
// 											{
// 												type: "text",
// 												text: "Caption",
// 											},
// 										],
// 									},
// 								],
// 							},
// 						],
// 					});
// 				},

// 			toggleCaption:
// 				() =>
// 				({ commands, editor }) => {
// 					let { caption } = editor.getAttributes(this.name);
// 					return editor.commands.updateAttributes("caption", {
// 						caption: !caption,
// 					});

// 					// let { caption } = editor.getAttributes("resizableMediaWithCaption");
// 					// if (caption) {
// 					// 	editor
// 					// 		.chain()
// 					// 		.focus()
// 					// 		.deleteNode("caption")
// 					// 		.updateAttributes("resizableMediaWithCaption", {
// 					// 			caption: !caption,
// 					// 		})
// 					// 		.run();
// 					// } else {
// 					// 	// editor.commands.insertContent({
// 					// 	// 	type: "caption",
// 					// 	// 	content: [
// 					// 	// 		{
// 					// 	// 			type: "paragraph",
// 					// 	// 			content: [
// 					// 	// 				{
// 					// 	// 					type: "text",
// 					// 	// 					text: "Caption",
// 					// 	// 				},
// 					// 	// 			],
// 					// 	// 		},
// 					// 	// 	],
// 					// 	// });
// 					// 	return true;
// 					// }
// 				},
// 		};
// 	},

// 	parseHTML() {
// 		return [
// 			{
// 				tag: "figure",
// 			},
// 		];
// 	},

// 	renderHTML({ HTMLAttributes }) {
// 		return [
// 			"figure",
// 			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
// 			0,
// 		];
// 	},

// 	addNodeView() {
// 		return ReactNodeViewRenderer(ResizableMediaWithCaptionNodeView);
// 	},
// });
