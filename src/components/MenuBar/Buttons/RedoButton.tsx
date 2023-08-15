import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { RedoIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const RedoButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<RedoIcon />}
			command={() => editor.chain().focus().redo().run()}
			disabled={!editor.can().redo()}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.redo")} shortcut="Mod-Y" />
				),
			}}
		/>
	);
};
