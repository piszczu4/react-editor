import { TrashIcon } from "./Icons";
import { useState } from "react";
import CloseIcon from "./Icons/CloseIcon";
import { _t } from "../helpers/strings";

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

const isColor = (strColor: string) => {
	const s = new Option().style;
	s.color = strColor;
	return s.color !== "";
};

type ColorItemProps = {
	color: string;
	label?: string;
	disabled?: boolean;
	colorCommand?: any;
};

const ColorItem = ({
	color,
	label,
	disabled = false,
	colorCommand,
}: ColorItemProps) => {
	return (
		<button
			onClick={colorCommand(color)}
			className="mw-color-palette--color-btn"
			title={label}
			style={{
				backgroundColor: color,
			}}
			disabled={disabled}
		>
			{disabled && <CloseIcon className="mw-icon--close" />}
		</button>
	);
};

const ColorInput = ({ colorCommand }: { colorCommand: any }) => {
	let [color, setColor] = useState<string>("");
	let [disabled, setDisabled] = useState<boolean>(true);

	function handleInput(value: string) {
		setColor(value);

		if (isColor(value)) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}

	return (
		<div
			className={`color-input-container ${
				color === "" ? "" : disabled ? "has-error" : "has-success"
			}`}
		>
			<label className="s-label mb4">{_t("palette.color")}</label>
			<div className="color-input">
				<input
					onInput={(e) => handleInput((e.target as HTMLInputElement).value)}
					className="s-input"
				></input>
				<ColorItem
					color={disabled ? "black" : color}
					disabled={disabled}
					colorCommand={colorCommand}
				/>
			</div>
			<p className="s-input-message mt4">
				{color === ""
					? _t("palette.info")
					: disabled
					? _t("palette.invalid")
					: _t("palette.correct")}
			</p>
		</div>
	);
};

type Props = {
	colorCommand: any;
	deleteCommand: any;
};

export const ColorPalette = ({ colorCommand, deleteCommand }: Props) => {
	let colorItems = COLORS.map(({ color, label }, index) => {
		return (
			<ColorItem
				key={index}
				color={color}
				label={label}
				colorCommand={colorCommand}
			/>
		);
	});

	let deleteButton = (
		<button
			onClick={deleteCommand}
			className="mw-color-palette--delete-btn"
			title="Delete"
		>
			<TrashIcon />
		</button>
	);

	let palette = (
		<div id="color-palette-popover">
			<label className="s-label mb4">{_t("palette.presets")}</label>
			<div id="mw-color-palette">{...colorItems} {deleteButton}</div>
			{<ColorInput colorCommand={colorCommand} />}
		</div>
	);
	return palette;
};
