import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { StrikethroughIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const StrikethroughButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<StrikethroughIcon />}
			command={() => editor.chain().focus().toggleStrike().run()}
			disabled={!editor.can().toggleStrike()}
			active={editor.isActive("textStyle", { strike: true })}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.strikethrough")}
						shortcut="Mod-Shift-X"
					/>
				),
			}}
		/>
	);
};
