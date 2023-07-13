import React from "react";
import { ReactDOM } from "react";
import { MenuButton } from "./MenuButton";

type Props = {
	children: JSX.Element[];
};

const MenuBlock = ({ children }: Props) => {
	return <div className="s-editor-menu-block d-flex g2">{children}</div>;
};

export default MenuBlock;


