import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { CodeBlockIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const CodeBlockButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<CodeBlockIcon />}
			command={() => editor.chain().focus().toggleCodeBlock().run()}
			disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
			active={editor.isActive("codeBlock")}
			tooltip={{
				content: <TooltipContent content="CodeBlock" shortcut="Mod-M" />,
			}}
		/>
	);
};
