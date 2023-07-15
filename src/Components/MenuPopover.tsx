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
		<div id={id} className="s-popover wmn-initial w-auto px0 py0" role="menu">
			<div className="s-popover--arrow"></div>
			<div
				data-key={id + "-content"}
				className={`d-grid grid__${nCols} py8 overflow-x-hidden hmx2`}
			>
				{children}
			</div>
		</div>
	);
};
