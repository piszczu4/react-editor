import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { ClearFormattingIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const ClearFormattingButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<ClearFormattingIcon className="clear-formatting-icon" />}
			command={() => editor.chain().focus().unsetAllMarks().run()}
			disabled={!editor.can().unsetAllMarks()}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.clear_formatting.title")}
						description={_t("commands.clear_formatting.description")}
						shortcut="Mod-Shift-C"
					/>
				),
			}}
		/>
	);
};
