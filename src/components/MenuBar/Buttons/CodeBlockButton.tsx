import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { CodeBlockIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const CodeBlockButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<CodeBlockIcon />}
			command={() => editor.chain().focus().toggleCodeBlock().run()}
			disabled={!editor.can().toggleCodeBlock()}
			active={editor.isActive("codeBlock")}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.code_block.title")}
						description={_t("commands.code_block.description")}
						shortcut="Mod-Shift-M"
					/>
				),
			}}
		/>
	);
};
