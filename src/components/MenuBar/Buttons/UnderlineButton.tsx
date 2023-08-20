import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { UnderlineIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const UnderlineButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<UnderlineIcon />}
			command={() => editor.chain().focus().toggleUnderline().run()}
			disabled={!editor.can().toggleUnderline()}
			active={editor.isActive("underline")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.underline")} shortcut="Mod-U" />
				),
			}}
		/>
	);
};
