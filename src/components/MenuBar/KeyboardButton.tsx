import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { KeyboardIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const KeyboardButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<KeyboardIcon />}
			command={() => editor.chain().focus().toggleKeyboard().run()}
			disabled={!editor.can().chain().focus().toggleKeyboard().run()}
			active={editor.isActive("keyboard")}
			tooltip={{
				content: <TooltipContent content="Keyboard" />,
			}}
		/>
	);
};
