import { Editor } from "@tiptap/react";
import { MathInlineIcon } from "../../Icons";
import { _t } from "../../../helpers/strings";
import { TooltipContent } from "../../TooltipContent";
import { MenuButton } from "../MenuButton";

type Props = {
	editor: Editor;
};

export const MathInlineButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<MathInlineIcon />}
			command={() => editor.chain().insertMathInline().run()}
			disabled={false}
			active={editor.isActive("math_inline")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.math_inline")} shortcut="Mod-M" />
				),
			}}
		/>
	);
};
