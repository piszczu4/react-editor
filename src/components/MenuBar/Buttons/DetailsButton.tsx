import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { DetailsIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const DetailsButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<DetailsIcon />}
			command={() => editor.chain().focus().setDetails().run()}
			disabled={!editor.can().setDetails()}
			active={editor.isActive("details")}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.details")}
						shortcut="Mod-Shift-D"
					/>
				),
			}}
		/>
	);
};
