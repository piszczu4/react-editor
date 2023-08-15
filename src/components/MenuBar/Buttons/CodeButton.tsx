import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { CodeIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const CodeButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<CodeIcon />}
			command={() => editor.chain().focus().toggleCode().run()}
			disabled={!editor.can().toggleCode()}
			active={editor.isActive("code")}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.code.title")}
						description={_t("commands.code.description")}
						shortcut="Mod-Shift-K"
					/>
				),
			}}
		/>
	);
};
