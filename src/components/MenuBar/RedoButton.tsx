import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { RedoIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const RedoButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<RedoIcon />}
			command={() => editor.chain().focus().redo().run()}
			disabled={!editor.can().chain().focus().redo().run()}
			tooltip={{ content: <TooltipContent content="Redo" shortcut="Mod-Y" /> }}
		/>
	);
};
