import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { MathPanelIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";

import { PanelType } from "../../../extensions/extension-math-panel/math-panel";
import { _t } from "../../../helpers/strings";
type Props = {
	editor: Editor;
};

export const MathPanelV2Button = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<MathPanelIcon />}
			command={() =>
				editor.chain().setMathPanelV2(PanelType.DEFINITION).focus().run()
			}
			// disabled={!editor.can().setMathPanelV2(PanelType.DEFINITION)}
			active={editor.isActive("mathPanelV2")}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.math_panel.title")}
						description={_t("commands.math_panel.description")}
						shortcut="Mod-Alt-[T,D,E,R]"
					/>
				),
			}}
		/>
	);
};
