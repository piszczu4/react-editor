import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { LinkIcon } from "..";
import { TooltipContent } from "../TooltipContent";
import { showLinkEditor } from "../../extensions/extension-link/commands/showLinkEditor";
import { useState } from "react";
import { LinkModal } from "../Modals/LinkModal";

type Props = {
	editor: Editor;
};

export const LinkButton = ({ editor }: Props) => {
	let [isOpen, setIsOpen] = useState(false);
	let [exists, setExists] = useState(false);

	let handleClick = () => {
		setExists(true);
		setIsOpen(true);
		return true;
	};

	return (
		<div>
			<MenuButton
				icon={<LinkIcon />}
				command={handleClick}
				active={editor.isActive("link")}
				tooltip={{
					content: <TooltipContent title="Link" shortcut="Mod-L" />,
				}}
			/>
			{exists && (
				<LinkModal
					isOpen={isOpen}
					hide={() => setIsOpen(false)}
					destroy={() => setExists(false)}
					editor={editor}
				></LinkModal>
			)}
		</div>
	);
};
