import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { SubscriptIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const SubscriptButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<SubscriptIcon />}
			command={() => editor.chain().focus().toggleSubscript().run()}
			disabled={!editor.can().chain().focus().toggleSubscript().run()}
			active={editor.isActive("subscript")}
			tooltip={{ content: <TooltipContent content="Subscript" /> }}
		/>
	);
};
