import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { TitlecaseIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const TitlecaseButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<TitlecaseIcon />}
			command={() => editor.chain().focus().capitalize("titlecase").run()}
			tooltip={{
				content: <TooltipContent content="Titlecase" />,
			}}
			text={<span>Title Case</span>}
		/>
	);
};
