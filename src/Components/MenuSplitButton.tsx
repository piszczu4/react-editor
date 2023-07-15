import React from "react";
import { ReactDOM } from "react";

import { MenuButton } from "./MenuButton";
import { MenuDropdownButton } from "./MenuDropdownButton";

type Props = {
	id: string;
	iconName: string;
	command: () => boolean;
	active?: boolean;
	tooltipData?: string | { title: string; description: string };
	children: JSX.Element[];
};

export const MenuSplitButton = ({
	id,
	iconName,
	command,
	active = false,
	tooltipData = "",
	children,
}: Props) => {
	return (
		<div className="mw-split-button" style={{ display: "flex" }}>
			<MenuButton
				id={id}
				iconName={iconName}
				command={command}
				active={active}
				cssStyles={{
					borderTopRightRadius: "0px",
					borderBottomRightRadius: "0px",
				}}
				tooltipData={tooltipData}
			/>
			<MenuDropdownButton
				id={id}
				nCols={1}
				children={children}
				cssStyles={{
					paddingLeft: "3px",
					paddingRight: "3px",
					borderTopLeftRadius: "0px",
					borderBottomLeftRadius: "0px",
				}}
			/>
		</div>
	);
};
