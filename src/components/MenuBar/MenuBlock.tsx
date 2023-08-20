type Props = {
	children: JSX.Element[] | JSX.Element;
};

export const MenuBlock = ({ children }: Props) => {
	return <div className="mw-editor-menu-block">{children}</div>;
};
