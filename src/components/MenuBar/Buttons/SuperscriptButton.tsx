import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { SuperscriptIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const SuperscriptButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<SuperscriptIcon />}
			command={() => editor.chain().focus().toggleSuperscript().run()}
			disabled={!editor.can().toggleSuperscript()}
			active={editor.isActive("superscript")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.superscript")} shortcut="Mod-." />
				),
			}}
		/>
	);
};
