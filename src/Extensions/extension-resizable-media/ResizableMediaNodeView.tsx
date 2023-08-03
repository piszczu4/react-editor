// import React, { useRef, useState, useEffect } from "react";
// import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

// export function ResizableMediaNodeView(props: any) {
// 	const isFloat = !!props.node.attrs.dataFloat;
// 	const isAlign = !!props.node.attrs.dataAlign;

// 	let mediaType = props.node.attrs["media-type"];
// 	let resizableImgRef = useRef<HTMLImageElement>(null);

// 	let isHorizontalResizeActive = false;
// 	let isVerticalResizeActive = false;
// 	let lastCursorX = -1;
// 	let lastCursorY = -1;
// 	let [proseMirrorContainerWidth, setProseMirrorContainerWidth] = useState(0);
// 	let [aspectRatio, setAspectRatio] = useState(0);

// 	const mediaSetupOnLoad = () => {
// 		// ! TODO: move this to extension storage
// 		const proseMirrorContainerDiv = document.querySelector(".ProseMirror");

// 		if (proseMirrorContainerDiv)
// 			setProseMirrorContainerWidth(proseMirrorContainerDiv?.clientWidth);

// 		// When the media has loaded
// 		if (!resizableImgRef.current) return;

// 		if (mediaType.value === "video") {
// 			// // Aspect Ratio from its original size
// 			// setTimeout(() => {
// 			// 	aspectRatio =
// 			// 		(resizableImgRef.current as HTMLVideoElement).videoWidth /
// 			// 		(resizableImgRef.current as HTMLVideoElement).videoHeight;
// 			// 	// for the first time when video is added with custom width and height
// 			// 	// and we have to adjust the video height according to it's width
// 			// 	onHorizontalResize("left", 0);
// 			// }, 200);
// 		} else {
// 			resizableImgRef.current.onload = () => {
// 				// Aspect Ratio from its original size
// 				setAspectRatio(
// 					(resizableImgRef.current as HTMLImageElement).naturalWidth /
// 						(resizableImgRef.current as HTMLImageElement).naturalHeight
// 				);

// 				onHorizontalResize("left", 0);
// 			};
// 		}

// 		// setTimeout(() => setMediaActionActiveStates(), 200);
// 	};

// 	const startHorizontalResize = (e: any) => {
// 		isHorizontalResizeActive = true;
// 		lastCursorX = e.clientX;

// 		document.addEventListener("mousemove", onHorizontalMouseMove);
// 		document.addEventListener("mouseup", stopHorizontalResize);
// 	};

// 	const stopHorizontalResize = () => {
// 		isHorizontalResizeActive = false;
// 		lastCursorX = -1;

// 		document.removeEventListener("mousemove", onHorizontalMouseMove);
// 		document.removeEventListener("mouseup", stopHorizontalResize);
// 	};

// 	const onHorizontalMouseMove = (e: any) => {
// 		if (!isHorizontalResizeActive) return;

// 		const { clientX } = e;

// 		const diff = lastCursorX - clientX;

// 		lastCursorX = clientX;

// 		if (diff === 0) return;

// 		const directionOfMouseMove: "left" | "right" = diff > 0 ? "left" : "right";

// 		onHorizontalResize(directionOfMouseMove, Math.abs(diff));
// 	};

// 	interface WidthAndHeight {
// 		width: number;
// 		height: number;
// 	}

// 	const limitWidthOrHeightToFiftyPixels = ({ width, height }: WidthAndHeight) =>
// 		width < 100 || height < 100;

// 	const onHorizontalResize = (
// 		directionOfMouseMove: "right" | "left",
// 		diff: number
// 	) => {
// 		let resizableImg = resizableImgRef.current;
// 		if (!resizableImg) {
// 			console.error("Media ref is undefined|null", {
// 				resizableImg: resizableImg,
// 			});
// 			return;
// 		}

// 		const currentMediaDimensions = {
// 			width: resizableImg.width,
// 			height: resizableImg.height,
// 		};

// 		const newMediaDimensions = {
// 			width: -1,
// 			height: -1,
// 		};

// 		if (directionOfMouseMove === "left") {
// 			newMediaDimensions.width = currentMediaDimensions.width - Math.abs(diff);
// 		} else {
// 			newMediaDimensions.width = currentMediaDimensions.width + Math.abs(diff);
// 		}

// 		if (newMediaDimensions.width > proseMirrorContainerWidth)
// 			newMediaDimensions.width = proseMirrorContainerWidth;

// 		newMediaDimensions.height = newMediaDimensions.width / aspectRatio;

// 		if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return;

// 		props.updateAttributes(newMediaDimensions);
// 	};

// 	const startVerticalResize = (e: any) => {
// 		// setIsVerticalResizeActive(true);
// 		isVerticalResizeActive = true;
// 		lastCursorY = e.clientY;

// 		document.addEventListener("mousemove", onVerticalMouseMove);
// 		document.addEventListener("mouseup", stopVerticalResize);
// 	};

// 	const stopVerticalResize = () => {
// 		// setIsVerticalResizeActive(false);
// 		isVerticalResizeActive = false;
// 		lastCursorY = -1;

// 		document.removeEventListener("mousemove", onVerticalMouseMove);
// 		document.removeEventListener("mouseup", stopVerticalResize);
// 	};

// 	const onVerticalMouseMove = (e: any) => {
// 		if (!isVerticalResizeActive) return;

// 		const { clientY } = e;

// 		const diff = lastCursorY - clientY;

// 		lastCursorY = clientY;

// 		if (diff === 0) return;

// 		const directionOfMouseMove: "up" | "down" = diff > 0 ? "up" : "down";

// 		if (!resizableImgRef.current) {
// 			console.error("Media ref is undefined|null", {
// 				resizableImg: resizableImgRef.current,
// 			});
// 			return;
// 		}

// 		const currentMediaDimensions = {
// 			width: resizableImgRef.current.width,
// 			height: resizableImgRef.current.height,
// 		};

// 		const newMediaDimensions = {
// 			width: -1,
// 			height: -1,
// 		};

// 		if (directionOfMouseMove === "up") {
// 			newMediaDimensions.height =
// 				currentMediaDimensions.height - Math.abs(diff);
// 		} else {
// 			newMediaDimensions.height =
// 				currentMediaDimensions.height + Math.abs(diff);
// 		}

// 		newMediaDimensions.width = newMediaDimensions.height * aspectRatio;

// 		if (newMediaDimensions.width > proseMirrorContainerWidth) {
// 			newMediaDimensions.width = proseMirrorContainerWidth;

// 			newMediaDimensions.height = newMediaDimensions.width / aspectRatio;
// 		}

// 		if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return;

// 		props.updateAttributes(newMediaDimensions);
// 	};

// 	useEffect(() => mediaSetupOnLoad);

// 	return (
// 		<NodeViewWrapper
// 			as="article"
// 			className={
// 				"media-node-view " +
// 				(isFloat
// 					? "f-" + props.node.attrs.dataFloat
// 					: isAlign
// 					? "align-" + props.node.attrs.dataAlign
// 					: "")
// 			}
// 		>
// 			<span className="tippy">
// 				<div className={"media-container"}>
// 					<img
// 						ref={resizableImgRef}
// 						src={props.node.attrs.src}
// 						alt={props.node.attrs.alt}
// 						width={props.node.attrs.width}
// 						height={props.node.attrs.height}
// 						draggable={true}
// 					/>
// 					<div
// 						className={
// 							"horizontal-resize-handle" +
// 							(isHorizontalResizeActive ? " horizontal-resize-active" : "")
// 						}
// 						title="Resize"
// 						onMouseDown={startHorizontalResize}
// 						onMouseUp={stopHorizontalResize}
// 					></div>

// 					<div
// 						className={
// 							"vertical-resize-handle" +
// 							(isVerticalResizeActive ? " vertical-resize-active" : "")
// 						}
// 						title="Resize"
// 						onMouseDown={startVerticalResize}
// 						onMouseUp={stopVerticalResize}
// 					></div>
// 				</div>
// 			</span>
// 		</NodeViewWrapper>
// 	);
// }
