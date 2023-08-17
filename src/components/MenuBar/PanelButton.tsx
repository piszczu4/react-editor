import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { PanelIcon } from "../Icons";
import { TooltipContent } from "../TooltipContent";

import { PanelType } from "../../extensions/extension-panel/panel";

type Props = {
	editor: Editor;
};

export const PanelButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<PanelIcon />}
			command={() =>
				editor.chain().focus().setPanel({ panelType: PanelType.INFO }).run()
			}
			disabled={
				!editor
					.can()
					.chain()
					.focus()
					.setPanel({ panelType: PanelType.INFO })
					.run()
			}
			active={editor.isActive("panel")}
			tooltip={{
				content: <TooltipContent title="Panel" />,
			}}
		/>
	);
};
