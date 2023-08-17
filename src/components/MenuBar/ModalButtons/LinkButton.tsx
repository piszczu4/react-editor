import { Editor } from "@tiptap/react";
import { useState } from "react";
import { _t } from "../../../helpers/strings";
import { LinkIcon } from "../../Icons";
import { LinkModal } from "../../Modals/LinkModal";
import { TooltipContent } from "../../TooltipContent";
import { MenuButton } from "../MenuButton";

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
				disabled={!editor.can().setLink({ href: "https://www.google.pl/" })}
				tooltip={{
					content: (
						<TooltipContent
							title={_t("commands.link.title")}
							shortcut="Mod-L"
						/>
					),
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
