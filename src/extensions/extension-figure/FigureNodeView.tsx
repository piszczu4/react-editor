import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";

export function FigureNodeView({ node, editor }: NodeViewProps) {
	const [isFloat, setIsFloat] = useState<boolean>();

	useEffect(() => {
		setIsFloat(node.attrs.dataFloat);
	}, [node.attrs]);

	const [isAlign, setIsAlign] = useState<boolean>();

	useEffect(() => {
		setIsAlign(node.attrs.dataAlign);
	}, [node.attrs]);

	let type = node.attrs.type;

	let mediaWidth;
	let isMediaWidthInPx;

	let isWidthInPercentages =
		typeof node.attrs.width === "string" && node.attrs.width.endsWith("%");

	if (type === "image" || type === "video") {
		mediaWidth = editor.getAttributes("image")["width"];
		isMediaWidthInPx = mediaWidth && typeof mediaWidth !== "string";
	}

	return (
		<NodeViewWrapper
			as="figure"
			className={
				"figure-node-view " +
				(isFloat
					? "f-" + node.attrs.dataFloat
					: isAlign
					? "justify-" + node.attrs.dataAlign
					: "")
			}
			data-type={type}
			data-caption={node.attrs.caption}
			style={{
				overflowX: type === "table" ? "auto" : undefined,
				width: isMediaWidthInPx
					? mediaWidth
					: isWidthInPercentages
					? node.attrs.width
					: undefined,
				height: "auto",

				marginRight:
					(isWidthInPercentages && node.attrs.dataAlign === "left") ||
					node.attrs.dataAlign === "center"
						? "auto"
						: undefined,
				marginLeft:
					(isWidthInPercentages && node.attrs.dataAlign === "right") ||
					node.attrs.dataAlign === "center"
						? "auto"
						: undefined,
			}}
		>
			<NodeViewContent
				style={{ width: isWidthInPercentages ? "100%" : undefined }}
			/>
		</NodeViewWrapper>
	);
}
