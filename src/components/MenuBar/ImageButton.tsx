import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { ImageIcon } from "..";
import { TooltipContent } from "../TooltipContent";

import { useState, useRef } from "react";
import { Modal } from "../Modal";
type Props = {
	editor: Editor;
};

import { ImageModal } from "../Modals/ImageModal";

export const ImageButton = ({ editor }: Props) => {
	const [exists, setExists] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	let handleClick = () => {
		setExists(true);
		setIsOpen(true);
		return true;
	};

	return (
		<div>
			<MenuButton icon={<ImageIcon />} command={handleClick} />
			{exists && (
				<ImageModal
					isOpen={isOpen}
					hide={() => setIsOpen(false)}
					destroy={() => setExists(false)}
					editor={editor}
				></ImageModal>
			)}
		</div>
	);
};

// <ImageModal
// 	editor={editor}
// 	isShow={isShow}
// 	setIsShow={setIsShow}
// 	exists={exists}
// 	setExists={setExists}
// 	// uploadOptions={{ handler: defaultImageUploadHandler }}
// />
