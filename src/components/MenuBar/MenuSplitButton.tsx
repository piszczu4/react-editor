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
};

export const MenuSplitButton = ({ id, button, dropdownButton }: Props) => {
	return (
		<div id={id} className={`mw-split-btn`}>
			{button}
			{dropdownButton}
		</div>
	);
};
