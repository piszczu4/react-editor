import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { DetailsIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const DetailsButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<DetailsIcon />}
			command={() => editor.chain().focus().setDetails().run()}
			disabled={!editor.can().chain().focus().setDetails().run()}
			active={editor.isActive("details")}
			tooltip={{
				content: <TooltipContent content="Details" />,
			}}
		/>
	);
};
