import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { HorizontalRuleIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const HorizontalRuleButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<HorizontalRuleIcon />}
			command={() => editor.chain().focus().setHorizontalRule().run()}
			disabled={!editor.can().chain().focus().setHorizontalRule().run()}
			tooltip={{
				content: <TooltipContent content="Horizontal rule" shortcut="Mod-R" />,
			}}
		/>
	);
};
