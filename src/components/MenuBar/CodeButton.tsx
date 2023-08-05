import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { CodeIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const CodeButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<CodeIcon />}
			command={() => editor.chain().focus().toggleCode().run()}
			disabled={!editor.can().chain().focus().toggleCode().run()}
			active={editor.isActive("code")}
			tooltip={{
				content: <TooltipContent content="Code" shortcut="Mod-K" />,
			}}
		/>
	);
};
