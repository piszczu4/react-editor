import { useRef } from "react";

// ! had to manage this state outside of the component because `useState` isn't fast enough and creates problem cause
// ! the function is getting old data even though new data is set by `useState` before the execution of function

let lastClientX: number;

type Props = {
	targetId: string;
};

export const Resizer = ({ targetId }: Props) => {
	// const setLastClientX = (x: number) => {
	// 	lastClientX = x;
	// };

	// const documentHorizontalMouseMove = (e: MouseEvent) => {
	// 	setTimeout(() => touchMouseMove(e));
	// };

	// const touchMouseStart = (e: { clientX: number }) => {
	// 	// setIsHorizontalResizeActive(true);
	// 	lastClientX = e.clientX;

	// 	setTimeout(() => {
	// 		document.addEventListener("mousemove", documentHorizontalMouseMove);
	// 		document.addEventListener("mouseup", touchMouseEnd);
	// 	});
	// };

	// const touchMouseEnd = () => {
	// 	lastClientX = -1;

	// 	document.removeEventListener("mousemove", documentHorizontalMouseMove);
	// 	document.removeEventListener("mouseup", touchMouseEnd);
	// };

	// const onHorizontalResize = (
	// 	directionOfMouseMove: "top" | "bottom",
	// 	diff: number
	// ) => {
	// 	const currentDimensions = {
	// 		width: document.getElementById("editor-content").width,
	// 		height: ref.current?.height,
	// 	};

	// 	const newDimensions = {
	// 		width: -1,
	// 		height: -1,
	// 	};

	// 	if (directionOfMouseMove === "top") {
	// 		newDimensions.height = currentDimensions.height - Math.abs(diff);
	// 	} else {
	// 		newDimensions.height = currentDimensions.height + Math.abs(diff);
	// 	}

	// 	ref.current.height = newDimensions.height;
	// };

	// const touchMouseMove = (e: any) => {
	// 	if (lastClientX === -1) return;

	// 	const { clientX } = e;

	// 	const diff = lastClientX - clientX;

	// 	if (diff === 0) return;

	// 	const directionOfMouseMove: "top" | "bottom" = diff > 0 ? "top" : "bottom";

	// 	setTimeout(() => {
	// 		onHorizontalResize(directionOfMouseMove, Math.abs(diff));
	// 		lastClientX = clientX;
	// 	});
	// };

	let resizerRef = useRef<HTMLDivElement>(null);

	// let handleClick = () => {
	// 	console.log("clicked!");
	// 	// setLastClientX(clientX);
	// };

	//////////////////////////////////////////////////////////

	let currentPosition: any;
	let mouseDown: any;
	let lastClientY: any;

	function touchMouseStart(e: any) {
		e.preventDefault();
		// if (!ref.current) return;
		mouseDown = true;
		if (e.touches) currentPosition = e.touches[0].clientY;
		else currentPosition = e.clientY;

		lastClientY = document.getElementById(targetId)?.offsetHeight;
		// console.log("LastClientY");
		// console.log(lastClientY);

		// document.addEventListener("mousemove", documentHorizontalMouseMove);
		// document.addEventListener("mouseup", stopHorizontalResize);
	}

	function touchMouseEnd(e: any) {
		e.preventDefault();
		mouseDown = false;

		lastClientY = document.getElementById(targetId)?.offsetHeight;

		// lastClientY = ref.current?.offsetHeight;
		// console.log("LastClientY");
		// console.log(lastClientY);
	}

	function touchMouseMove(e: any) {
		e.preventDefault();
		if (!mouseDown) return;
		if (e.touches) var pozycja = e.touches[0].clientY;
		else var pozycja = e.clientY;

		// console.log("pozycja");
		// console.log(pozycja);

		var wysokosc = pozycja - currentPosition;

		// console.log("wysokosc");
		// console.log(wysokosc);

		document.getElementById(targetId)!.style.height =
			lastClientY + wysokosc + "px";
	}

	// return (
	// 	<div
	// 		ref={resizerRef}
	// 		className="mw-resizer"
	// 		// onPointerDown={(e: any) =>
	// 		// 	resizerRef.current?.setPointerCapture(e.pointerId)
	// 		// }
	// 		// onPointerUp={(e: any) =>
	// 		// 	resizerRef.current?.releasePointerCapture(e.pointerId)
	// 		// }
	// 		onMouseDown={touchMouseStart}
	// 		onMouseUp={touchMouseEnd}
	// 		onClick={({ clientX }) => setLastClientX(clientX)}
	// 		// onMouseMove={touchMouseMove}
	// 	></div>
	// );
	return (
		<div
			ref={resizerRef}
			className="mw-resizer"
			onPointerDown={(e: any) =>
				resizerRef.current?.setPointerCapture(e.pointerId)
			}
			onPointerUp={(e: any) =>
				resizerRef.current?.releasePointerCapture(e.pointerId)
			}
			onMouseDown={touchMouseStart}
			onMouseUp={touchMouseEnd}
			onTouchStart={touchMouseStart}
			onTouchEnd={touchMouseEnd}
			onTouchCancel={touchMouseEnd}
			onClick={(e) => e.preventDefault()}
			onTouchMove={touchMouseMove}
			onMouseMove={touchMouseMove}
		></div>
	);
};
