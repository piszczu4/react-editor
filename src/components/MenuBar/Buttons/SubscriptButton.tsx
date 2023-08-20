import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { SubscriptIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const SubscriptButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<SubscriptIcon />}
			command={() => editor.chain().focus().toggleSubscript().run()}
			disabled={!editor.can().toggleSubscript()}
			active={editor.isActive("subscript")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.subscript")} shortcut="Mod-," />
				),
			}}
		/>
	);
};
