import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { ItalicIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const ItalicButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<ItalicIcon />}
			command={() => editor.chain().focus().toggleItalic().run()}
			disabled={!editor.can().toggleItalic()}
			active={editor.isActive("italic")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.italic")} shortcut="Mod-I" />
				),
			}}
		/>
	);
};
