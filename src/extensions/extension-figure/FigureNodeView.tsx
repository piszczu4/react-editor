import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";

export function FigureNodeView({
	node,
	updateAttributes,
	editor,
}: NodeViewProps) {
	const [isFloat, setIsFloat] = useState<boolean>();

	useEffect(() => {
		setIsFloat(node.attrs.dataFloat);
	}, [node.attrs]);

	const [isAlign, setIsAlign] = useState<boolean>();

	useEffect(() => {
		setIsAlign(node.attrs.dataAlign);
	}, [node.attrs]);

	let isWidthInPercentages =
		typeof node.attrs.width === "string" && node.attrs.width.endsWith("%");

	let { width } = editor.getAttributes("image");
	let isImageWidthInPx = width && typeof width !== "string";

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
			data-caption={node.attrs.caption}
			style={{
				overflowX: "auto",
				width: isImageWidthInPx
					? width
					: isWidthInPercentages
					? node.attrs.width
					: undefined,

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
			<NodeViewContent />
		</NodeViewWrapper>
	);
}
