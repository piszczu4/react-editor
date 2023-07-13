import React from "react";
import { ReactDOM } from "react";

import { escapeHTML } from "@stackoverflow/stacks-editor/dist/shared/utils";

type Props = {
	id: string;
	nCols: number;
	children: JSX.Element[];
};

export const MenuPopover = ({ id, nCols, children }: Props) => {
	return (
		<div
			id={id}
			className="s-popover wmn-initial w-auto px0 pt0 py8"
			role="menu"
		>
			<div className="s-popover--arrow"></div>
			<div className={`d-grid grid__${nCols}`}>{children}</div>
		</div>
	);
};
