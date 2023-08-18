import { Editor } from "@tiptap/react";
import { ImageIcon } from "../Icons";
import { TooltipContent } from "../TooltipContent";
import { MenuButton } from "./MenuButton";

import { useState } from "react";
import { _t } from "../../helpers/strings";
import { ImageModal } from "../Modals/ImageModal";

type Props = {
	editor: Editor;
};

export const ImageButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [exists, setExists] = useState(false);

	let handleClick = () => {
		setExists(true);
		setIsOpen(true);
		return true;
	};

	return (
		<div>
			<MenuButton
				icon={<ImageIcon />}
				command={handleClick}
				tooltip={{
					content: <TooltipContent title={_t("commands.image.title")} />,
				}}
				active={editor.isActive("image")}
				disabled={false}
			/>
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
