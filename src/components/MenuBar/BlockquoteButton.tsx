import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { QuoteIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const BlockquoteButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<QuoteIcon />}
			command={() => editor.chain().focus().toggleBlockquote().run()}
			disabled={!editor.can().chain().focus().toggleBlockquote().run()}
			active={editor.isActive("blockquote")}
			tooltip={{
				content: <TooltipContent content="Blockquote" shortcut="Mod-Q" />,
			}}
		/>
	);
};
