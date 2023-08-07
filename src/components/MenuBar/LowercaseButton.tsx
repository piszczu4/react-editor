import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { LowercaseIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const LowercaseButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<LowercaseIcon />}
			command={() => editor.chain().focus().capitalize("lowercase").run()}
			tooltip={{
				content: <TooltipContent content="Lowercase" />,
			}}
			text={<span>lowercase</span>}
		/>
	);
};
