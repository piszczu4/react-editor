type MenuDropdownProps = {
	children: JSX.Element[] | JSX.Element;
	id?: string;
	nCols?: number;
};

export const MenuDropdown = ({
	children,
	id = undefined,
	nCols = 1,
}: MenuDropdownProps) => {
	return (
		<div className="mw-dropdown-content">
			<div id={id} className={`d-grid grid__${nCols}`}>
				{children}
			</div>
		</div>
	);
};
