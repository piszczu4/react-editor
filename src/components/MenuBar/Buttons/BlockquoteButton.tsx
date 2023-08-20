import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { QuoteIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const BlockquoteButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<QuoteIcon />}
			command={() => editor.chain().focus().toggleBlockquote().run()}
			disabled={!editor.can().toggleBlockquote()}
			active={editor.isActive("blockquote")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.blockquote")} shortcut="Mod-Q" />
				),
			}}
		/>
	);
};
