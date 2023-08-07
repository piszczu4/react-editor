import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { SpoilerIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const SpoilerButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<SpoilerIcon />}
			command={() => editor.chain().focus().toggleSpoiler().run()}
			disabled={!editor.can().chain().focus().toggleSpoiler().run()}
			active={editor.isActive("spoiler")}
			tooltip={{
				content: <TooltipContent content="Spoiler" />,
			}}
		/>
	);
};
