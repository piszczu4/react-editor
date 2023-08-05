import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { StrikethroughIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const StrikethroughButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<StrikethroughIcon />}
			command={() => editor.chain().focus().toggleStrike().run()}
			disabled={!editor.can().chain().focus().toggleStrike().run()}
			active={editor.isActive("strikethrough")}
			tooltip={{ content: <TooltipContent content="Strikethrough" /> }}
		/>
	);
};
