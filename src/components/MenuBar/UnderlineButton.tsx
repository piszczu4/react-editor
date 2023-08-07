import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { UnderlineIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const UnderlineButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<UnderlineIcon />}
			command={() => editor.chain().focus().toggleUnderline().run()}
			disabled={!editor.can().chain().focus().toggleUnderline().run()}
			active={editor.isActive("underline")}
			tooltip={{
				content: <TooltipContent content="Underline" />,
			}}
		/>
	);
};
