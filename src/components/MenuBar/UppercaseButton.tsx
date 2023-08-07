import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { UppercaseIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const UppercaseButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<UppercaseIcon />}
			command={() => editor.chain().focus().capitalize("uppercase").run()}
			tooltip={{
				content: <TooltipContent content="Uppercase" />,
			}}
			text={<span>UPPERCASE</span>}
		/>
	);
};
