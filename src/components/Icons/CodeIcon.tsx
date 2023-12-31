type Props = {
	className?: string;
};

export default ({ className }: Props) => {
	return (
		<svg
			className={className}
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8 4.41L6.59 3L0.589996 9L6.59 15L8 13.59L3.41 9L8 4.41Z"
				fill="black"
			/>
			<path
				d="M10 4.41L11.41 3L17.41 9L11.41 15L10 13.59L14.59 9L10 4.41Z"
				fill="black"
			/>
		</svg>
	);
};
