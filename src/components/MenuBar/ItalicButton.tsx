import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { ItalicIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const ItalicButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<ItalicIcon />}
			command={() => editor.chain().focus().toggleItalic().run()}
			disabled={!editor.can().chain().focus().toggleItalic().run()}
			active={editor.isActive("italic")}
			tooltip={{
				content: <TooltipContent content="Italic" shortcut="Mod-I" />,
			}}
		/>
	);
};
