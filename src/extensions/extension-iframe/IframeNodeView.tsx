import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";

// ! had to manage this state outside of the component because `useState` isn't fast enough and creates problem cause
// ! the function is getting old data even though new data is set by `useState` before the execution of function
let lastClientX: number;

const setLastClientX = (x: number) => {
	lastClientX = x;
};

interface WidthAndHeight {
	width: number;
	height: number;
}

export function IframeNodeView({ node, updateAttributes }: NodeViewProps) {
	const [aspectRatio, setAspectRatio] = useState(0);

	const [proseMirrorContainerWidth, setProseMirrorContainerWidth] = useState(0);

	const resizableImgRef = useRef<HTMLIFrameElement | null>(null);

	const mediaSetupOnLoad = () => {
		// ! TODO: move this to extension storage
		const proseMirrorContainerDiv = document.querySelector(".ProseMirror");

		if (proseMirrorContainerDiv)
			setProseMirrorContainerWidth(proseMirrorContainerDiv?.clientWidth);

		// When the media has loaded
		if (!resizableImgRef.current) return;

		resizableImgRef.current.onload = () => {
			// Aspect Ratio from its original size
			setAspectRatio(
				Number((resizableImgRef.current! as HTMLIFrameElement)?.width) /
					Number((resizableImgRef.current as HTMLIFrameElement).height)
			);
		};
	};

	useEffect(() => {
		mediaSetupOnLoad();
	});

	// const [isHorizontalResizeActive, setIsHorizontalResizeActive] =
	// 	useState(false);

	const limitWidthOrHeightToFiftyPixels = ({ width, height }: WidthAndHeight) =>
		width < 100 || height < 100;

	const documentHorizontalMouseMove = (e: MouseEvent) => {
		setTimeout(() => onHorizontalMouseMove(e));
	};

	const startHorizontalResize = (e: { clientX: number }) => {
		console.log("Start");
		// setIsHorizontalResizeActive(true);
		lastClientX = e.clientX;

		setTimeout(() => {
			document.addEventListener("mousemove", documentHorizontalMouseMove);
			document.addEventListener("mouseup", stopHorizontalResize);
		});
	};

	const stopHorizontalResize = () => {
		console.log("Stop");

		// setIsHorizontalResizeActive(false);
		lastClientX = -1;

		document.removeEventListener("mousemove", documentHorizontalMouseMove);
		document.removeEventListener("mouseup", stopHorizontalResize);
	};

	const onHorizontalResize = (
		directionOfMouseMove: "right" | "left",
		diff: number
	) => {
		if (!resizableImgRef.current) {
			console.error("Media ref is undefined|null", {
				resizableImg: resizableImgRef.current,
			});
			return;
		}

		const currentMediaDimensions = {
			width: resizableImgRef.current?.width,
			height: resizableImgRef.current?.height,
		};

		const newMediaDimensions = {
			width: -1,
			height: -1,
		};

		if (directionOfMouseMove === "left") {
			newMediaDimensions.width =
				Number(currentMediaDimensions.width) - Math.abs(diff);
		} else {
			newMediaDimensions.width =
				Number(currentMediaDimensions.width) + Math.abs(diff);
		}

		if (newMediaDimensions.width > proseMirrorContainerWidth)
			newMediaDimensions.width = proseMirrorContainerWidth;

		newMediaDimensions.height = newMediaDimensions.width / aspectRatio;

		if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return;

		updateAttributes(newMediaDimensions);
	};

	const onHorizontalMouseMove = (e: MouseEvent) => {
		if (lastClientX === -1) return;

		const { clientX } = e;

		const diff = lastClientX - clientX;

		if (diff === 0) return;

		const directionOfMouseMove: "left" | "right" = diff > 0 ? "left" : "right";

		setTimeout(() => {
			onHorizontalResize(directionOfMouseMove, Math.abs(diff));
			lastClientX = clientX;
		});
	};

	let isWidthInPercentages =
		typeof node.attrs.width === "string" && node.attrs.width.endsWith("%");

	return (
		<NodeViewWrapper
			as="div"
			className="iframe-node-view group"
			contentEditable={false}
		>
			<iframe
				// contentEditable={false}
				src={node.attrs.src}
				ref={resizableImgRef as any}
				className="pointer-events-none"
				width={isWidthInPercentages ? "100%" : node.attrs.width}
				height={node.attrs.height}
				allowFullScreen={true}
				frameBorder={0}
				marginWidth={0}
				marginHeight={0}
			/>

			<div
				contentEditable={false}
				className="horizontal-resize-handle group-hover:bg-black group-hover:border-2 group-hover:border-white"
				title="Resize"
				onClick={({ clientX }) => setLastClientX(clientX)}
				onMouseDown={startHorizontalResize}
				onMouseUp={stopHorizontalResize}
			/>
		</NodeViewWrapper>
	);
}
