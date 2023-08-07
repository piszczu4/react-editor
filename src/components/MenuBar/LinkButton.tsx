import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { LinkIcon } from "..";
import { TooltipContent } from "../TooltipContent";
import { showLinkEditor } from "../../extensions/extension-link/commands/showLinkEditor";

type Props = {
	editor: Editor;
};

export const LinkButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<LinkIcon />}
			command={() => {
				showLinkEditor(editor.view);
				return true;
			}}
			active={editor.isActive("link")}
			tooltip={{
				content: <TooltipContent content="Link" shortcut="Mod-L" />,
			}}
		/>
	);
};
