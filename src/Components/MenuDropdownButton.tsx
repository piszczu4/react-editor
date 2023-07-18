import React from "react";
import { ReactDOM } from "react";

import { escapeHTML } from "@stackoverflow/stacks-editor/dist/shared/utils";

import { generateRandomId } from "@stackoverflow/stacks-editor/dist/shared/utils";
import { useState } from "react";

import { MenuButton } from "./MenuButton";
import { MenuPopover } from "./MenuPopover";

type Props = {
	/**
	 * Unique id for a button, for example `bold`.
	 */
	id: string;
	/**
	 * JSX.Elements to be placed in the dropdown
	 */
	children: JSX.Element[];
	/**
	 * Name of the icon to use, for example `Bold`. It's inserted into `span` with `data-key = id + __icon`
	 */

	iconName?: string | null;
	/**
	 * Determines whether button should be `disabled` or not.
	 */
	disabled?: boolean;
	/**
	 * Determines whether button should be highlighted as `active` or not.
	 */
	active?: boolean;
	/**
	 * The data to be used when generating popover. Popover will not be generated if the data is `null`
	 */
	innerText?: string | null;
	/**
	 * Button's inside HTML - if not null, `span` with `data-key = id + __innerHTML` is created inside button
	 */
	innerHTML?: string | null;
	/**
	 * The data to be used when generating popover. Popover will not be generated if the data is `null`
	 */
	tooltipData?:
		| string
		| {
				title: string;
				description?: string | null;
				placement?: string | null;
		  }
		| null;
	/**
	 * Additional css classes to be applied to the `button` element
	 */
	cssClasses?: string[];
	/**
	 * Additional css styles to be applied to the `button` element
	 */
	cssStyles?: React.CSSProperties;
	/**
	 * Number of columns to be used in the dropdown
	 */
	nCols?: number;
};

export const MenuDropdownButton = ({
	id,
	children,
	iconName = null,
	disabled = false,
	active = false,
	innerText = null,
	innerHTML = null,
	tooltipData = null,
	cssClasses = [],
	cssStyles = {},
	nCols = 1,
}: Props) => {
	const popoverId = `${id}-popover`;
	const buttonId = `${id}-btn`;

	cssClasses.push("mw-dropdown-button");
	return (
		<>
			<span
				data-controller="s-popover"
				data-s-popover-reference-selector={`#${buttonId}`}
				data-s-popover-toggle-class="is-selected"
				data-s-popover-placement="bottom"
			>
				<MenuButton
					id={buttonId}
					data-key={id}
					iconName={iconName}
					command={() => false}
					active={active}
					disabled={disabled}
					innerHTML={innerHTML}
					innerText={innerText}
					cssStyles={cssStyles}
					cssClasses={cssClasses}
					tooltipData={tooltipData}
					ariaControls={popoverId}
					kind="dropdown-button"
				/>
				<MenuPopover id={popoverId} children={children} nCols={nCols} />
			</span>
		</>
	);
};
