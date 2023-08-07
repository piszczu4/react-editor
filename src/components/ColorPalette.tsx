// const COLORS = [
// 	{ label: "Dark grey", color: "rgb(23, 43, 77)" },
// 	{ label: "Light gray", color: "rgb(117, 129, 149)" },
// 	{ label: "White", color: "rgb(255, 255, 255)" },
// 	{ label: "Dark blue", color: "rgb(0, 85, 204)" },
// 	{ label: "Blue", color: "rgb(29, 122, 252)" },
// 	{ label: "Light blue", color: "rgb(204, 224, 255)" },
// 	{ label: "Dark teal", color: "rgb(32, 107, 116)" },
// 	{ label: "Teal", color: "rgb(29, 154, 170)" },
// 	{ label: "Light teal", color: "rgb(193, 240, 245)" },
// 	{ label: "Dark green", color: "rgb(33, 110, 78)" },
// 	{ label: "Green", color: "rgb(34, 160, 107)" },
// 	{ label: "Light green", color: "rgb(186, 243, 219)" },
// 	{ label: "Dark Orange", color: "rgb(217, 112, 8)" },
// 	{ label: "Orange", color: "rgb(250, 165, 61)" },
// 	{ label: "Light yellow", color: "rgb(248, 230, 160)" },
// 	{ label: "Dark red", color: "rgb(174, 42, 25)" },
// 	{ label: "Red", color: "rgb(227, 73, 53)" },
// 	{ label: "Light red", color: "rgb(255, 210, 204)" },
// 	{ label: "Dark purple", color: "rgb(94, 77, 178)" },
// 	{ label: "Purple", color: "rgb(130, 112, 219)" },
// 	{ label: "Light purple", color: "rgb(223, 216, 253)" },
// ];

import { TrashIcon } from ".";
import { MenuDropdown } from "./MenuDropdown";

const COLORS = [
	{ color: "rgb(191, 237, 210)", label: "Light Green" },
	{ color: "rgb(251, 238, 184)", label: "Light Yellow" },
	{ color: "rgb(248, 202, 198)", label: "Light Red" },
	{ color: "rgb(236, 202, 250)", label: "Light Purple" },
	{ color: "rgb(194, 224, 244)", label: "Light Blue" },
	{ color: "rgb(45, 194, 107)", label: "Green" },
	{ color: "rgb(241, 196, 15)", label: "Yellow" },
	{ color: "rgb(224, 62, 45)", label: "Red" },
	{ color: "rgb(185, 106, 217)", label: "Purple" },
	{ color: "rgb(53, 152, 219)", label: "Blue" },
	{ color: "rgb(22, 145, 121)", label: "Dark Green" },
	{ color: "rgb(230, 126, 35)", label: "Orange" },
	{ color: "rgb(186, 55, 42)", label: "Dark Red" },
	{ color: "rgb(132, 63, 161)", label: "Dark Purple" },
	{ color: "rgb(35, 111, 161)", label: "Dark Blue" },
	{ color: "rgb(236, 240, 241)", label: "Light Gray" },
	{ color: "rgb(206, 212, 217)", label: "Medium Gray" },
	{ color: "rgb(149, 165, 166)", label: "Gray" },
	{ color: "rgb(126, 140, 141)", label: "Dark Grey" },
	{ color: "rgb(52, 73, 94)", label: "Navy Blue" },
	{ color: "black", label: "Black" },
	{ color: "white", label: "White" },
];

type ColorItemProps = {
	color: string;
	label: string;
};

const ColorItem = ({ color, label }: ColorItemProps) => {
	return (
		<button
			className="mw-color-palette--color-btn"
			title={label}
			style={{
				backgroundColor: color,
			}}
		></button>
	);
};

export const ColorPalette = () => {
	let colorItems = COLORS.map(({ color, label }, index) => {
		return <ColorItem key={index} color={color} label={label} />;
	});

	let deleteButton = (
		<button className="mw-color-palette--delete-btn" title="Delete">
			<TrashIcon />
		</button>
	);

	let colorInput = (
		<div className="mw-color-palette--color-input">
			<input placeholder="color name/rgb/hsl"></input>
			<button>OK</button>
		</div>
	);

	let palette = (
		<div>
			<div id="mw-color-palette">{...colorItems} {deleteButton}</div>
			{colorInput}
		</div>
	);
	return palette;
};
