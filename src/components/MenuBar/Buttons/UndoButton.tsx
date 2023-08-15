import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { UndoIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const UndoButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<UndoIcon />}
			command={() => editor.chain().focus().undo().run()}
			disabled={!editor.can().undo()}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.undo")} shortcut="Mod-Z" />
				),
			}}
		/>
	);
};
