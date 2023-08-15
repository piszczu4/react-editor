import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { BoldIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const BoldButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<BoldIcon />}
			command={() => editor.chain().focus().toggleBold().run()}
			disabled={!editor.can().toggleBold()}
			active={editor.isActive("bold")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.bold")} shortcut="Mod-B" />
				),
			}}
		/>
	);
};
