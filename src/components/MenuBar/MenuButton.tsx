import React, { ReactNode } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import "tippy.js/animations/scale-extreme.css";

import { Placement } from "tippy.js";
import { DropdownIcon } from "..";

// import { escapeHTML } from "@stackoverflow/stacks-editor/dist/shared/utils";
// import { renderToString } from "react-dom/server";

export const Tooltip = () => {
	return <div></div>;
};

type Props = {
	id?: string;
	icon?: JSX.Element | null;
	command?: () => boolean;
	disabled?: boolean;
	active?: boolean;
	tooltip?: { content: JSX.Element | string; placement?: string } | null;
	text?: JSX.Element;
	dropdown?: {
		isDropdownButton?: boolean;
		isDropdownItem?: boolean;
		dropdownContent?: JSX.Element;
		isOpen?: boolean;
		setIsOpen?: (isOpen: boolean) => void;
	};
};

export const MenuButton = ({
	id,
	icon,
	command,
	disabled = false,
	active = false,
	tooltip,
	text,
	dropdown,
}: Props) => {
	let button = (
		<button
			id={id}
			className={`mw-btn ${
				dropdown?.isDropdownItem ? "mw-btn-dropdown--item" : ""
			} ${active ? "is-active " : ""} ${disabled ? "is-disabled " : ""}`}
			onClick={!disabled ? command : () => false}
		>
			{icon !== null && icon}
			{text && <div className="mw-btn--text">{text}</div>}
			{dropdown?.isDropdownButton && (
				<DropdownIcon className="mw-btn--dropdown-icon" />
			)}
		</button>
	);

	let buttonWithTooltip = (
		<Tippy
			animation={"scale-extreme"}
			placement={tooltip?.placement ? (tooltip?.placement as Placement) : "top"}
			className="mw-tooltip"
			content={tooltip?.content}
			disabled={!tooltip?.content}
			interactive={true}
		>
			{button}
		</Tippy>
	);

	if (!dropdown?.isDropdownButton) return <div>{buttonWithTooltip}</div>;

	return (
		<div>
			<Tippy
				className="mw-popover"
				content={dropdown.dropdownContent}
				animation={false}
				placement="bottom"
				interactive={true}
				visible={dropdown.isOpen}
				onClickOutside={() => dropdown.setIsOpen && dropdown.setIsOpen(false)}
			>
				{buttonWithTooltip}
			</Tippy>
		</div>
	);
};
