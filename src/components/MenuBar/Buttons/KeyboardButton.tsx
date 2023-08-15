import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { KeyboardIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const KeyboardButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<KeyboardIcon />}
			command={() => editor.chain().focus().toggleKeyboard().run()}
			disabled={!editor.can().toggleKeyboard()}
			active={editor.isActive("keyboard")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.keyboard")} shortcut="Mod-'" />
				),
			}}
		/>
	);
};
