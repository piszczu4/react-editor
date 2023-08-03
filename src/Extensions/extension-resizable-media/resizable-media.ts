// import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
// import { ReactNodeViewRenderer } from "@tiptap/react";

// import { ResizableMediaNodeView } from "./ResizableMediaNodeView";
// import { ResizableMediaNodeViewV2 } from "./ResizableMediaNodeViewV2";

// declare module "@tiptap/core" {
// 	interface Commands<ReturnType> {
// 		resizableMedia: {
// 			/**
// 			 * Set media
// 			 */
// 			setMedia: (options: {
// 				"media-type": "img" | "video";
// 				src: string;
// 				alt?: string;
// 				title?: string;
// 				width?: string;
// 				height?: string;
// 			}) => ReturnType;
// 			/**
// 			 * Rotate
// 			 */
// 			rotate: (deg: number, mode: "" | "-x" | "-y") => ReturnType;
// 		};
// 	}
// }

// export interface MediaOptions {
// 	// inline: boolean, // we have floating support, so block is good enough
// 	// allowBase64: boolean, // we're not going to allow this
// 	HTMLAttributes: Record<string, any>;
// }

// export const IMAGE_INPUT_REGEX =
// 	/(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

// export const VIDEO_INPUT_REGEX =
// 	/!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

// export const ResizableMedia = Node.create<MediaOptions>({
// 	name: "resizableMedia",

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

// 	addAttributes() {
// 		return {
// 			src: {
// 				default: null,
// 			},
// 			"media-type": {
// 				default: null,
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
// 			"data-rotate": {
// 				default: null,
// 				renderHTML: ({ "data-rotate": rotate }) => ({
// 					"data-rotate": rotate,
// 					style: rotate ? `transform: rotate(${rotate}deg)` : null,
// 				}),
// 				parseHTML: (element: HTMLElement) =>
// 					element.getAttribute("data-rotate"),
// 			},
// 			"data-rotate-x": {
// 				default: null,
// 				renderHTML: ({ "data-rotate-x": rotateX }) => ({
// 					"data-rotate-x": rotateX,
// 					style: rotateX ? `transform: rotateX(${rotateX}deg)` : null,
// 				}),
// 				parseHTML: (element: HTMLElement) =>
// 					element.getAttribute("data-rotate-x"),
// 			},
// 			"data-rotate-y": {
// 				default: null,
// 			},
// 		};
// 	},

// 	selectable: true,

// 	parseHTML() {
// 		return [
// 			{
// 				tag: 'img[src]:not([src^="data:"])',
// 				getAttrs: (el) => {
// 					let element = el as HTMLImageElement;
// 					return {
// 						src: element.getAttribute("src"),
// 						"media-type": "img",
// 						"data-rotate": element.getAttribute("data-rotate"),
// 					};
// 				},
// 			},
// 			// {
// 			// 	tag: "video",
// 			// 	getAttrs: (el) => ({
// 			// 		src: el.getAttribute("src"),
// 			// 		"media-type": "video",
// 			// 	}),
// 			// },
// 		];
// 	},

// 	renderHTML({ HTMLAttributes }) {
// 		const { "media-type": mediaType } = HTMLAttributes;

// 		if (mediaType === "img") {
// 			return [
// 				"img",
// 				{
// 					...mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
// 				},
// 				,
// 			];
// 		} else if (mediaType === "video") {
// 			return [
// 				"video",
// 				{ controls: "true", style: "width: 100%", ...HTMLAttributes },
// 				["source", HTMLAttributes],
// 			];
// 		}

// 		if (!mediaType)
// 			console.error(
// 				"TiptapMediaExtension-renderHTML method: Media Type not set, going default with image"
// 			);

// 		return [
// 			"img",
// 			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
// 		];
// 	},

// 	addCommands() {
// 		return {
// 			setMedia:
// 				(options) =>
// 				({ commands }) => {
// 					const { "media-type": mediaType } = options;

// 					if (mediaType === "img") {
// 						return commands.insertContent({
// 							type: this.name,
// 							attrs: options,
// 						});
// 					} else if (mediaType === "video") {
// 						return commands.insertContent({
// 							type: this.name,
// 							attrs: {
// 								...options,
// 								controls: "true",
// 							},
// 						});
// 					}

// 					if (!mediaType)
// 						console.error(
// 							"TiptapMediaExtension-setMedia: Media Type not set, going default with image"
// 						);

// 					return commands.insertContent({
// 						type: this.name,
// 						attrs: options,
// 					});
// 				},

// 			rotate:
// 				(deg, mode) =>
// 				({ commands, editor }) => {
// 					let attr: string = `data-rotate${mode}`;
// 					let currDeg = editor.getAttributes(this.name)[attr];
// 					currDeg = currDeg ?? 0;
// 					let attrs: Record<string, any> = {};
// 					attrs[attr] = currDeg + deg;
// 					return commands.updateAttributes(this.name, attrs);
// 				},
// 		};
// 	},

// 	addNodeView() {
// 		return ReactNodeViewRenderer(ResizableMediaNodeViewV2);
// 	},

// 	addInputRules() {
// 		return [
// 			nodeInputRule({
// 				find: IMAGE_INPUT_REGEX,
// 				type: this.type,
// 				getAttributes: (match) => {
// 					const [, , alt, src, title] = match;

// 					return {
// 						src,
// 						alt,
// 						title,
// 						"media-type": "img",
// 					};
// 				},
// 			}),
// 			nodeInputRule({
// 				find: VIDEO_INPUT_REGEX,
// 				type: this.type,
// 				getAttributes: (match) => {
// 					const [, , src] = match;

// 					return {
// 						src,
// 						"media-type": "video",
// 					};
// 				},
// 			}),
// 		];
// 	},
// });
