import { MenuButton } from "./MenuButton";
import { CodeViewIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	isCodeViewMode: boolean;
	setIsCodeViewMode: (isCodeViewMode: boolean) => void;
};

export const CodeViewButton = ({
	isCodeViewMode,
	setIsCodeViewMode,
}: Props) => {
	return (
		<MenuButton
			icon={<CodeViewIcon />}
			command={() => {
				setIsCodeViewMode(!isCodeViewMode);
				return true;
			}}
			tooltip={{
				content: <TooltipContent content="Code View" />,
			}}
		/>
	);
};
