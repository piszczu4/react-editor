import React, { ReactNode } from "react";
import Tippy from "@tippyjs/react";

import { Placement } from "tippy.js";
import { DropdownIcon } from "../Icons";

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
	tooltip?:
		| { content: JSX.Element | string; placement?: string }
		| null
		| string;
	text?: JSX.Element;
	dropdown?: {
		isDropdownButton?: boolean;
		isDropdownItem?: boolean;
		dropdownContent?: JSX.Element;
		isOpen?: boolean;
		setIsOpen?: (isOpen: boolean) => void;
		dropdownIcon?: boolean;
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
				dropdown?.isDropdownItem ? "mw-btn-dropdown--item " : ""
			}
				${dropdown?.isDropdownButton ? "mw-btn-dropdown " : ""}

			} ${active ? "is-active " : ""} ${disabled ? "is-disabled " : ""}`}
			onClick={!disabled ? command : () => false}
			title={typeof tooltip === "string" ? tooltip : undefined}
		>
			{icon !== null && <span className="mw-btn--icon">{icon}</span>}
			{text && <div className="mw-btn--text">{text}</div>}
			{dropdown?.isDropdownButton && (
				<DropdownIcon className="mw-btn--dropdown-icon" />
			)}
		</button>
	);

	let buttonWithTooltip =
		tooltip && typeof tooltip !== "string" ? (
			<div className="tippy">
				<Tippy
					animation={"scale-extreme"}
					placement={
						tooltip?.placement ? (tooltip?.placement as Placement) : "top"
					}
					className="mw-tooltip"
					content={tooltip?.content}
					disabled={!tooltip?.content}
					interactive={true}
					appendTo={() => document.body}
				>
					{button}
				</Tippy>
			</div>
		) : (
			button
		);

	if (!dropdown?.isDropdownButton) return buttonWithTooltip;

	return (
		<div className="tippy">
			<Tippy
				className="mw-tippy-popover"
				content={dropdown.dropdownContent}
				animation={false}
				placement="bottom"
				interactive={true}
				visible={dropdown.isOpen}
				onClickOutside={() => dropdown.setIsOpen && dropdown.setIsOpen(false)}
				appendTo={() => document.body}
			>
				{buttonWithTooltip}
			</Tippy>
		</div>
	);
};
