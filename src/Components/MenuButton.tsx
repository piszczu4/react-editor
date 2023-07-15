import React from "react";
import { ReactDOM } from "react";

import { escapeHTML } from "@stackoverflow/stacks-editor/dist/shared/utils";

type Props = {
	id: string;
	iconName?: string | null;
	innerText?: string | null;
	innerHTML?: string | null;

	command: () => boolean;
	disabled?: boolean;
	active?: boolean;
	tooltipData?: string | { title: string; description: string };
	ariaControls?: string | null;
	dataAction?: string | null;
	cssClasses?: string[];
	cssStyles?: Record<string, string>;
	dropdown?: boolean;
	role?: string | null;
	dropdownItem?: boolean;
};

export const MenuButton = ({
	id,
	iconName = null,
	innerText = null,
	innerHTML = null,
	command,
	disabled = false,
	active = false,
	tooltipData = "",
	ariaControls = null,
	dataAction = null,
	cssClasses = [],
	cssStyles = {},
	dropdown = false,
	dropdownItem = false,
	role = null,
}: Props) => {
	let activeClass = active ? "is-selected" : "";

	let title = tooltipData as string;
	let description = null;
	if (typeof tooltipData !== "string") {
		title = tooltipData.title;
		description = tooltipData.description;
	}

	let classes = cssClasses.join(" ");

	return (
		<button
			id={id}
			className={`s-editor-btn s-btn js-editor-btn js-${id} ${activeClass} ${classes} d-flex ai-center`}
			style={cssStyles}
			onClick={command}
			disabled={disabled}
			role={role ? role : undefined}
			type="button"
			title={title}
			aria-label={title}
			data-s-tooltip-html-title={
				description
					? escapeHTML`<p class="mb4">${title}</p><p class="fs-caption fc-light m0">${description}</p>`
					: null
			}
			data-controller={dropdownItem ? null : "s-tooltip"}
			data-action={dataAction != null ? (dataAction as string) : null}
			data-s-tooltip-placement="bottom"
			data-key={id}
			aria-controls={
				ariaControls != null ? (ariaControls as string) : undefined
			}
		>
			{iconName ? (
				<span
					className={`svg-icon-bg icon${iconName}`}
					data-key={iconName}
				></span>
			) : null}
			{innerHTML || innerText ? (
				<span
					data-key="innerText"
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
			{dropdown ? (
				<span
					className={`svg-icon-bg iconArrowDownAlt`}
					data-key={iconName}
				></span>
			) : null}
		</button>
	);
};
