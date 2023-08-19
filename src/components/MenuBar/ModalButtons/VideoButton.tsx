import { Editor } from "@tiptap/react";
import { VideoIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { MenuButton } from "../MenuButton";

import { useState } from "react";
import { _t } from "../../../helpers/strings";
import { VideoModal } from "../../Modals/VideoModal";

type Props = {
	editor: Editor;
};

export const VideoButton = ({ editor }: Props) => {
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
				icon={<VideoIcon />}
				command={handleClick}
				tooltip={{
					content: <TooltipContent title={_t("commands.video.title")} />,
				}}
				active={editor.isActive("iframe")}
				disabled={false}
			/>
			{exists && (
				<VideoModal
					isOpen={isOpen}
					hide={() => setIsOpen(false)}
					destroy={() => setExists(false)}
					editor={editor}
				></VideoModal>
			)}
		</div>
	);
};
