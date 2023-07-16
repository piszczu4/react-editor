import React from "react";
import { ReactDOM } from "react";

import { escapeHTML } from "@stackoverflow/stacks-editor/dist/shared/utils";
import { renderToString } from "react-dom/server";

type Props = {
	/**
	 * Unique id for a button, for example `bold`.
	 */
	id: string;
	/**
	 * The command to be executed once the button is clicked.
	 */
	command?: () => boolean;
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
	 * Button text - if not null, `span` with `data-key = id + __innerText` is created inside button
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

	// To remove!
	/**
	 * Additional css classes to be applied to the `button` element
	 */
	cssClasses?: string[];
	/**
	 * Additional css styles to be applied to the `button` element
	 */
	cssStyles?: React.CSSProperties;
	/**
	 * button's role
	 */
	role?: string | null;
	/**
	 * button's aria controls
	 */
	ariaControls?: string | null;
	/**
	 * button's kind
	 */
	kind?: "dropdown-btn" | "dropdown-item" | null;
};

export const MenuInput = ({
	id,
	command = () => true,
	iconName = null,
	innerText = null,
	innerHTML = null,
	disabled = false,
	active = false,
	tooltipData = null,
	cssClasses = [],
	cssStyles = {},
	ariaControls = null,
	role = "button",
	kind = null,
}: Props) => {
	if (innerText != null && innerHTML != null) {
		throw new Error(
			`innerText and innerHTML arguments cannot be both not null! The passed values are "${innerText}" for innerText and "${innerHTML}" for innerHTML!"`
		);
	}

	// Tooltip
	let title = tooltipData as string;
	let description = null;
	let placement = null;
	let controller = null;
	if (tooltipData != null && typeof tooltipData !== "string") {
		title = tooltipData.title;
		description = tooltipData.description;
		controller = "s-tooltip";
		if (tooltipData.placement) {
			placement = tooltipData.placement;
		} else {
			placement = "bottom";
		}
	}
	let tooltip = description ? (
		<>
			<p className="mb4">{escapeHTML`${title}`}</p>
			<p className="fs-caption fc-light m0">{escapeHTML`${description}`}</p>
		</>
	) : null;

	let isDropdown = ["dropdown-button", "dropdown-item"].includes(
		kind as string
	);

	return (
		<button
			id={id}
			className={`s-editor-btn s-btn js-editor-btn js-${id} d-flex ai-center ${
				active ? "is-selected" : ""
			} ${cssClasses.join(" ")}`}
			style={cssStyles}
			onClick={command}
			disabled={disabled}
			type="button"
			role={role ? role : undefined}
			title={title}
			aria-label={title}
			aria-controls={ariaControls != null ? ariaControls : undefined}
			data-s-tooltip-html-title={tooltip ? renderToString(tooltip) : null}
			data-s-tooltip-placement={placement}
			data-controller={controller}
			data-action={isDropdown ? "s-popover#toggle" : null} // related to aria-cotrnols?
			data-key={id}
		>
			{iconName ? (
				<span
					className={`svg-icon-bg icon${iconName}`}
					data-key={id + "__icon"}
				></span>
			) : null}
			{innerHTML || innerText ? (
				<span
					data-key={innerHTML ? id + "__innerHTML" : id + "__innerText"}
					style={{
						textAlign: "left",
						marginLeft: "8px",
						marginRight: "8px",
					}}
					dangerouslySetInnerHTML={
						innerHTML ? { __html: innerHTML as string } : undefined
					}
				>
					{innerText ? innerText : undefined}
				</span>
			) : null}
			{isDropdown ? (
				<span className={`svg-icon-bg iconArrowDownAlt`}></span>
			) : null}
		</button>
	);
};
