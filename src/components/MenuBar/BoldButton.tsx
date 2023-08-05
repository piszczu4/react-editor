import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { BoldIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const BoldButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<BoldIcon />}
			command={() => editor.chain().focus().toggleBold().run()}
			disabled={!editor.can().chain().focus().toggleBold().run()}
			active={editor.isActive("bold")}
			tooltip={{ content: <TooltipContent content="Bold" shortcut="Mod-B" /> }}
		/>
	);
};
