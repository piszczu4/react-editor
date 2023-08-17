import { Editor } from "@tiptap/react";
import { MathDisplayIcon } from "../../Icons";
import { _t } from "../../../helpers/strings";
import { TooltipContent } from "../../TooltipContent";
import { MenuButton } from "../MenuButton";

type Props = {
	editor: Editor;
};

export const MathDisplayButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<MathDisplayIcon />}
			command={() => editor.chain().toggleMathDisplay().run()}
			disabled={false}
			active={editor.isActive("math_display")}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.math_display")}
						shortcut="Mod-D"
					/>
				),
			}}
		/>
	);
};
