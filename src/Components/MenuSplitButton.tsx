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
	/**
	 * Additional css classes to be applied to the `button` element
	 */
	cssClasses?: string[];
};

export const MenuSplitButton = ({
	id,
	button,
	dropdownButton,
	cssClasses = [],
}: Props) => {
	return (
		<div
			id={id}
			className={`mw-split-button ${cssClasses.join(" ")}`}
			style={{ display: "flex" }}
		>
			<div className="mw-split-btn--button">{button}</div>
			<div className="mw-split-btb--dropdown">{dropdownButton}</div>
		</div>
	);
};
