type Props = {
	label: string;
};

export const DropdownSection = ({ label }: Props) => {
	return (
		<span className="flex--item ta-left fs-fine tt-uppercase mx12 mb6 mt12 fc-black-400">
			{label}
		</span>
	);
};
