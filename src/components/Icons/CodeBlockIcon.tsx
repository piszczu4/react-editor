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
				d="M9.25744 6.41L10.4935 5L14 9L10.4935 13L9.25744 11.59L11.5279 9L9.25744 6.41Z"
				fill="black"
			/>
			<path
				d="M7.50651 5L8.74256 6.41L6.47209 9L8.74256 11.59L7.50651 13L4 9L7.50651 5Z"
				fill="black"
			/>
			<path
				d="M3 1H13L17 5V15C17 16.1046 16.1046 17 15 17H3C1.89543 17 1 16.1046 1 15V3C1 1.89543 1.89543 1 3 1ZM3 3V15H15V5.82843L12.1716 3H3Z"
				fill="black"
			/>
		</svg>
	);
};
