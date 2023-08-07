import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { ClearFormattingIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const ClearFormattingButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<ClearFormattingIcon />}
			command={() => editor.chain().focus().unsetAllMarks().run()}
			disabled={!editor.can().chain().focus().unsetAllMarks().run()}
			tooltip={{ content: <TooltipContent content="Clear formatting" /> }}
		/>
	);
};
