import { useEffect, useRef } from "react";

type Props = {
	isOpen: boolean;
	onOutsideClick?: () => void;
	children: JSX.Element;
};

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
	if (!element) return;
	const r = element.getBoundingClientRect();

	let isInside =
		e.clientX > r.left &&
		e.clientX < r.right &&
		e.clientY > r.top &&
		e.clientY < r.bottom;

	return isInside;
};

export const Modal = ({ isOpen, children, onOutsideClick }: Props) => {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (isOpen) {
			ref.current?.close();
			ref.current?.showModal();
			ref.current?.classList.add("show");
			document.body.classList.add("modal-open"); // prevent bg scroll
		} else {
			ref.current?.close();
			ref.current?.classList.remove("show");
			document.body.classList.remove("modal-open");
		}
	}, [isOpen]);

	const handleOutsideClick = (e: any) => {
		let isHidden = e.target.hidden;
		if (!isHidden && !isClickInsideRectangle(e, ref.current!)) {
			onOutsideClick && onOutsideClick();
		}
	};
	return (
		<div className="mw-modal" onClick={handleOutsideClick}>
			<dialog className="mw-modal--dialog" ref={ref}>
				{children}
			</dialog>
		</div>
	);
};
