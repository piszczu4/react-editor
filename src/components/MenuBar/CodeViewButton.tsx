import { MenuButton } from "./MenuButton";
import { CodeViewIcon } from "..";
import { TooltipContent } from "../TooltipContent";
import { useState, useEffect } from "react";

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
			active={isCodeViewMode}
			command={() => {
				setIsCodeViewMode(!isCodeViewMode);
				return true;
			}}
			tooltip={{
				content: <TooltipContent title="Code View" />,
			}}
		/>
	);
};
