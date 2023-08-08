import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { PanelIcon } from "..";
import { TooltipContent } from "../TooltipContent";

import { PanelType } from "../../extensions/extension-math-panel/math-panel";
type Props = {
	editor: Editor;
};

export const MathPanelButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<PanelIcon />}
			command={() =>
				editor.chain().focus().setMathPanel(PanelType.DEFINITION).run()
			}
			disabled={
				!editor.can().chain().focus().setMathPanel(PanelType.DEFINITION).run()
			}
			active={editor.isActive("mathPanel")}
			tooltip={{
				content: <TooltipContent content="Math Panel" />,
			}}
		/>
	);
};
