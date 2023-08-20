type Props = {
	label: string;
};

export const DropdownSection = ({ label }: Props) => {
	return (
		<span className="mw-dropdown-section flex--item ta-left fs-fine tt-uppercase mx6 mb6 mt12 fc-black-400">
			{label}
		</span>
	);
};
