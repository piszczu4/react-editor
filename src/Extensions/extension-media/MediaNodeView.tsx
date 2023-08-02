import React, { useRef, useState, useEffect } from "react";
import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";

// ! had to manage this state outside of the component because `useState` isn't fast enough and creates problem cause
// ! the function is getting old data even though new data is set by `useState` before the execution of function
let lastClientX: number;

export function MediaNodeView({
	node,
	updateAttributes,
	deleteNode,
}: NodeViewProps) {
	const [mediaType, setMediaType] = useState<"img" | "video">();

	useEffect(() => {
		setMediaType(node.attrs["media-type"]);
	}, [node.attrs]);

	const [aspectRatio, setAspectRatio] = useState(0);

	const [proseMirrorContainerWidth, setProseMirrorContainerWidth] = useState(0);

	const resizableImgRef = useRef<HTMLImageElement | HTMLVideoElement | null>(
		null
	);

	const mediaSetupOnLoad = () => {
		// ! TODO: move this to extension storage
		const proseMirrorContainerDiv = document.querySelector(".ProseMirror");

		if (proseMirrorContainerDiv)
			setProseMirrorContainerWidth(proseMirrorContainerDiv?.clientWidth);

		// When the media has loaded
		if (!resizableImgRef.current) return;

		if (mediaType === "video") {
			const video = resizableImgRef.current as HTMLVideoElement;

			video.addEventListener("loadeddata", function () {
				// Aspect Ratio from its original size
				setAspectRatio(video.videoWidth / video.videoHeight);

				// for the first time when video is added with custom width and height
				// and we have to adjust the video height according to it's width
				onHorizontalResize("left", 0);
			});
		} else {
			resizableImgRef.current.onload = () => {
				// Aspect Ratio from its original size
				setAspectRatio(
					(resizableImgRef.current as HTMLImageElement).naturalWidth /
						(resizableImgRef.current as HTMLImageElement).naturalHeight
				);
			};
		}
	};

	const setLastClientX = (x: number) => {
		lastClientX = x;
	};

	useEffect(() => {
		mediaSetupOnLoad();
	});

	const [isHorizontalResizeActive, setIsHorizontalResizeActive] =
		useState(false);

	interface WidthAndHeight {
		width: number;
		height: number;
	}

	const limitWidthOrHeightToFiftyPixels = ({ width, height }: WidthAndHeight) =>
		width < 100 || height < 100;

	const documentHorizontalMouseMove = (e: MouseEvent) => {
		setTimeout(() => onHorizontalMouseMove(e));
	};

	const startHorizontalResize = (e: { clientX: number }) => {
		setIsHorizontalResizeActive(true);
		lastClientX = e.clientX;

		setTimeout(() => {
			document.addEventListener("mousemove", documentHorizontalMouseMove);
			document.addEventListener("mouseup", stopHorizontalResize);
		});
	};

	const stopHorizontalResize = () => {
		setIsHorizontalResizeActive(false);
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
			newMediaDimensions.width = currentMediaDimensions.width - Math.abs(diff);
		} else {
			newMediaDimensions.width = currentMediaDimensions.width + Math.abs(diff);
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

	let style: React.CSSProperties;
	let transform = [
		node.attrs["data-rotate"] ? `rotate(${node.attrs["data-rotate"]}deg)` : "",
		node.attrs["data-rotate-x"]
			? `rotateX(${node.attrs["data-rotate-x"]}deg)`
			: "",
		node.attrs["data-rotate-y"]
			? `rotateY(${node.attrs["data-rotate-y"]}deg)`
			: "",
	].join(" ");

	style = {
		transform: transform.trim() !== "" ? transform : undefined,
	};

	return (
		<NodeViewWrapper
			as="div"
			className={
				"media-with-caption-node-view " +
				(isFloat
					? "f-" + node.attrs.dataFloat
					: isAlign
					? "justify-" + node.attrs.dataAlign
					: "")
			}
			style={{
				width: isWidthInPercentages ? node.attrs.width : undefined,

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
			<figure
			// style={{
			// 	margin:
			// 		node.attrs.dataFloat === "center"
			// 			? "auto"
			// 			: node.attrs.dataFloat === "left"
			// 			? "0 auto"
			// 			: node.attrs.dataFloat === "right"
			// 			? "auto 0"
			// 			: undefined,
			// }}
			>
				<div className="media-container group">
					{mediaType === "img" && (
						<img
							src={node.attrs.src}
							ref={resizableImgRef as any}
							className="rounded-lg"
							alt={node.attrs.src}
							// width={!isWidthInPercentages ? node.attrs.width : null}
							width={isWidthInPercentages ? "100%" : node.attrs.width}
							height={!isWidthInPercentages ? node.attrs.height : null}
							style={style}
						/>
					)}

					{mediaType === "video" && (
						<video
							ref={resizableImgRef as any}
							className="rounded-lg"
							controls
							width={node.attrs.width}
							height={node.attrs.height}
						>
							<source src={node.attrs.src} />
						</video>
					)}

					<div
						className="horizontal-resize-handle group-hover:bg-black group-hover:border-2 group-hover:border-white"
						title="Resize"
						onClick={({ clientX }) => setLastClientX(clientX)}
						onMouseDown={startHorizontalResize}
						onMouseUp={stopHorizontalResize}
					/>
				</div>

				{node.attrs.caption && (
					<figcaption>
						<NodeViewContent></NodeViewContent>
					</figcaption>
				)}
			</figure>
		</NodeViewWrapper>
	);
}
