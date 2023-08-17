import { Editor } from "@tiptap/react";
import { TooltipContent } from "../../TooltipContent";
import { MenuButton } from "../MenuButton";

import { PanelType } from "../../../extensions/extension-panel/panel";
import { _t } from "../../../helpers/strings";
import { BoldIcon } from "../../Icons";

type Props = {
	editor: Editor;
};

export const PanelButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<BoldIcon />}
			command={() =>
				editor.chain().focus().setPanel({ panelType: PanelType.INFO }).run()
			}
			disabled={!editor.can().setPanel({ panelType: PanelType.INFO })}
			active={editor.isActive("panel")}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.panel.title")}
						description={_t("commands.panel.description")}
					/>
				),
			}}
		/>
	);
};
