import { useState } from "react";

import { MouseEvent, useEffect, useRef } from "react";
import { ImagesIcon } from ".";
import CloseIcon from "../assets/close-icon.svg";
import { _t } from "../helpers/strings";

import { Modal } from "./Modal";

import { Editor } from "@tiptap/react";
import { stackOverflowValidateLink as validateLink } from "../extensions/extension-link/link-editor";
import { BubbleMenu } from "@tiptap/react";

import { InfinitySpin } from "react-loader-spinner";

import "tippy.js/dist/svg-arrow.css";


type ImageButtonProps = {
	editor: Editor;
};
// export const DialogModalTester = ({ editor }: ImageButtonProps) => {
// 	const [isOpened, setIsOpened] = useState(false);
// 	const [isVisible, setIsVisible] = useState(false);

// 	let onClick = () => {
// 		setIsOpened(true);
// 		setIsVisible(true);
// 	};
// 	return (
// 		<div>
// 			<button onClick={onClick}>Open "dialog" modal</button>
// 			{isOpened && (
// 				<ImageModal
// 					editor={editor}
// 					isOpened={isOpened}
// 					setIsOpened={setIsOpened}
// 					isVisible={isVisible}
// 					setIsVisible={setIsVisible}
// 					uploadOptions={{ handler: defaultImageUploadHandler }}
// 				/>
// 			)}
// 		</div>
// 	);
// };

export function ImageView() {}
