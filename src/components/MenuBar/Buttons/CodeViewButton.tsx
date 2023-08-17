import { _t } from "../../../helpers/strings";
import { CodeViewIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { MenuButton } from "../MenuButton";
import { Editor } from "@tiptap/react";

type Props = {
	editor: Editor;
	isCodeViewMode: boolean;
	setIsCodeViewMode: (isCodeViewMode: boolean) => void;
};

export const CodeViewButton = ({
	editor,
	isCodeViewMode,
	setIsCodeViewMode,
}: Props) => {
	return (
		<MenuButton
			icon={<CodeViewIcon />}
			active={isCodeViewMode}
			command={() => {
				setIsCodeViewMode(!isCodeViewMode);
				editor.commands.focus();
				return true;
			}}
			tooltip={{
				content: <TooltipContent title={_t("commands.code_view")} />,
			}}
		/>
	);
};
