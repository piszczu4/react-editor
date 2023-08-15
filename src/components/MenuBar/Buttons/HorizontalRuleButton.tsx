import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { HorizontalRuleIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const HorizontalRuleButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<HorizontalRuleIcon />}
			command={() => editor.chain().focus().setHorizontalRule().run()}
			disabled={!editor.can().setHorizontalRule()}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.horizontal_rule")}
						shortcut="Mod-R"
					/>
				),
			}}
		/>
	);
};
