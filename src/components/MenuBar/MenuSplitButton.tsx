import Tippy from "@tippyjs/react";
import { Placement } from "tippy.js";

type Props = {
	/**
	 * Unique id for a button, for example `bold`.
	 */
	id: string;
	/**
	 * Main button
	 */
	button: JSX.Element;
	/**
	 * Dropdown button
	 */
	dropdownButton: JSX.Element;
	tooltip?:
		| { content: JSX.Element | string; placement?: string }
		| null
		| string;
};

export const MenuSplitButton = ({
	id,
	button,
	dropdownButton,
	tooltip,
}: Props) => {
	let splitBtn = (
		<div id={id} className={`mw-split-btn`}>
			<div className="mw-split-btn--button">{button}</div>
			<div className="mw-split-btn--dropdown">{dropdownButton}</div>
		</div>
	);

	if (tooltip && typeof tooltip !== "string")
		return (
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
				>
					{splitBtn}
				</Tippy>
			</div>
		);

	return splitBtn;
};
