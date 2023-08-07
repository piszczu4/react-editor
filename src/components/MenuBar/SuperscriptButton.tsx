import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { SuperscriptIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const SuperscriptButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<SuperscriptIcon />}
			command={() => editor.chain().focus().toggleSuperscript().run()}
			disabled={!editor.can().chain().focus().toggleSuperscript().run()}
			active={editor.isActive("superscript")}
			tooltip={{ content: <TooltipContent content="Superscript" /> }}
		/>
	);
};
