// import React, { useRef, useState, useEffect } from "react";
// import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";

// // ! had to manage this state outside of the component because `useState` isn't fast enough and creates problem cause
// // ! the function is getting old data even though new data is set by `useState` before the execution of function
// let lastClientX: number;

// export function MediaNodeView({
// 	node,
// 	updateAttributes,
// 	deleteNode,
// }: NodeViewProps) {
// 	let x = node;
// 	return (
// 		<NodeViewWrapper as="div">
// 			<div></div>
// 		</NodeViewWrapper>
// 	);
// }
