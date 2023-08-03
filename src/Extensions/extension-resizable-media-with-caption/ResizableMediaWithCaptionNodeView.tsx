// import React, { useRef, useState, useEffect } from "react";
// import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";

// export function ResizableMediaWithCaptionNodeView({
// 	node,
// 	updateAttributes,
// 	deleteNode,
// }: NodeViewProps) {
// 	const [isFloat, setIsFloat] = useState<boolean>();

// 	useEffect(() => {
// 		setIsFloat(node.attrs.dataFloat);
// 	}, [node.attrs]);

// 	const [isAlign, setIsAlign] = useState<boolean>();

// 	useEffect(() => {
// 		setIsAlign(node.attrs.dataAlign);
// 	}, [node.attrs]);

// 	// let [isWidthInPercentages, SetisWidthInPercentages] = useState(false);

// 	// useEffect(() => {
// 	// 	SetisWidthInPercentages(
// 	// 		typeof node.attrs.width === "string" && node.attrs.width.endsWith("%")
// 	// 	);
// 	// }, [node.attrs.width]);

// 	let isWidthInPercentages =
// 		typeof node.attrs.width === "string" && node.attrs.width.endsWith("%");

// 	return (
// 		<NodeViewWrapper
// 			as="div"
// 			className={
// 				"media-with-caption-node-view " +
// 				(isFloat
// 					? "f-" + node.attrs.dataFloat
// 					: isAlign
// 					? "justify-" + node.attrs.dataAlign
// 					: "")
// 			}
// 			style={isWidthInPercentages ? { width: node.attrs.width } : {}}
// 		>
// 			<figure>
// 				<NodeViewContent></NodeViewContent>
// 			</figure>
// 		</NodeViewWrapper>
// 	);
// }
