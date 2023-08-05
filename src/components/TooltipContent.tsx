import { getShortcut } from "../utils";

type Props = {
	content: string;
	shortcut?: string;
};

export const TooltipContent = ({ content, shortcut }: Props): JSX.Element => {
	return (
		<p>
			{content}
			{shortcut && <span className="mw-shortcut">{getShortcut(shortcut)}</span>}
		</p>
	);
};
