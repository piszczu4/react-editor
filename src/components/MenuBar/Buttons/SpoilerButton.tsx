import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { SpoilerIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const SpoilerButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<SpoilerIcon />}
			command={() => editor.chain().focus().toggleSpoiler().run()}
			disabled={!editor.can().toggleSpoiler()}
			active={editor.isActive("spoiler")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.spoiler")} shortcut="Mod-/" />
				),
			}}
		/>
	);
};
