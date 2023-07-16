import React from "react";
import { ReactDOM } from "react";

import { escapeHTML } from "@stackoverflow/stacks-editor/dist/shared/utils";

import { MenuButton } from "./MenuButton";
import { generateRandomId } from "@stackoverflow/stacks-editor/dist/shared/utils";
import { MenuPopover } from "./MenuPopover";
import { useState } from "react";

type Props = {
	id: string;
	disabled?: boolean;
	active?: boolean;
	tooltipData?: string | { title: string; description: string };
	children: JSX.Element[];
	nCols?: number;
	iconName?: string | null;
	cssStyles?: Record<string, string>;
	innerText?: string | null;
};

export const MenuDropdownButton = ({
	id,
	disabled = false,
	active = false,
	tooltipData = "",
	children,
	nCols = 1,
	iconName = null,
	innerText = null,
	cssStyles = {},
}: Props) => {
	let title = tooltipData as string;
	let description = null;
	if (typeof tooltipData !== "string") {
		title = tooltipData.title;
		description = tooltipData.description;
	}

	const randomId = generateRandomId();
	const popoverId = `${id}-popover-${randomId}`;
	const buttonId = `${id}-btn-${randomId}`;

	return (
		<span
			data-controller="s-popover"
			data-s-popover-toggle-class="is-selected"
			data-s-popover-placement="bottom"
			data-s-popover-reference-selector={`#${buttonId}`}
		>
			<MenuButton
				id={buttonId}
				data-key={id}
				iconName={iconName}
				command={() => false}
				ariaControls={popoverId}
				dataAction="s-popover#toggle"
				active={active}
				dropdown={true}
				innerText={innerText}
				cssStyles={cssStyles}
				tooltipData={tooltipData}
			/>
			<MenuPopover id={popoverId} children={children} nCols={nCols} />
		</span>
	);
};

// return (
//     <div
//         data-controller="s-popover"
//         data-s-popover-toggle-class="is-selected"
//         data-s-popover-placement="bottom"
//         data-s-popover-reference-selector={`#${buttonId}`}
//     >
//         <MenuButton
//             id={id}
//             iconName={iconName}
//             command={() => true}
//             ariaControls={popoverId}
//             dataAction="s-popover#toggle"
//         />
//         <MenuPopover id={popoverId} children={children} nCols={nCols} />
//     </div>
// );
