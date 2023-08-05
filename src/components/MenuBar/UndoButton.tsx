import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { UndoIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const UndoButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<UndoIcon />}
			command={() => editor.chain().focus().undo().run()}
			disabled={!editor.can().chain().focus().undo().run()}
			tooltip={{ content: <TooltipContent content="Undo" shortcut="Mod-Z" /> }}
		/>
	);
};
