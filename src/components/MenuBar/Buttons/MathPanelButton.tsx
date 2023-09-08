import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { MathPanelIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";

import { PanelType } from "../../../extensions/extension-math-panel/math-panel";
import { _t } from "../../../helpers/strings";
type Props = {
	editor: Editor;
};

export const MathPanelButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<MathPanelIcon />}
			command={() =>
				editor.chain().setMathPanel(PanelType.DEFINITION, 1).focus().run()
			}
			// disabled={!editor.can().setMathPanel(PanelType.DEFINITION)}
			active={editor.isActive("mathPanel")}
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
