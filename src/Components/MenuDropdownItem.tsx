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
	nCols: number;
	iconName?: string | null;
	cssStyles?: Record<string, string>;
	innerText?: string | null;
};

export const MenuDropdownItem = ({
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
				data-controller="s-tooltip"
				active={active}
				innerText={innerText}
				cssStyles={cssStyles}
				kind={"dropdown-item"}
			/>
			<MenuPopover id={popoverId} children={children} nCols={nCols} />
		</span>
	);
};

// export function makeDropdownItem(
// 	innerHTML: string,
// 	command: Pick<MenuItem, "richText" | "commonmark">,
// 	key: string,
// 	cssClasses?: string[]
// ): MenuItem {
// 	let wrapper = document.createElement("button");
// 	wrapper.role = "button";
// 	wrapper.setAttribute("role", "menuitem");
// 	wrapper.className =
// 		"s-block-link s-editor--dropdown-item js-editor-btn d-flex ai-center";
// 	wrapper.dataset.action = "s-popover#hide";

// 	if (cssClasses) {
// 		wrapper.classList.add(...cssClasses);
// 	}

// 	let Item = document.createElement("div");
// 	Item.innerHTML = innerHTML;
// 	wrapper.appendChild(Item);

// 	return Object.assign(Object.assign({ key: key }, command), {
// 		display: wrapper,
// 	});
// }
