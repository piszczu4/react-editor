import { getShortcut } from "../utils";

type Props = {
	title?: string;
	description?: string;
	shortcut?: string;
};

export const TooltipContent = ({
	title,
	description,
	shortcut,
}: Props): JSX.Element => {
	return (
		<div className="mw-tooltip-content">
			{
				<p className="title">
					{title}{" "}
					{shortcut && (
						<span className="shortcut">{getShortcut(shortcut)}</span>
					)}
				</p>
			}
			{description && (
				<p className="description fs-caption fc-light mb0">{description}</p>
			)}
		</div>
	);
};
