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
				d="M15 2C15.5523 2 16 2.44772 16 3V4H2V3C2 2.44772 2.44772 2 3 2H5C5 1.44772 5.44772 1 6 1H12C12.5523 1 13 1.44772 13 2H15Z"
				fill="black"
			/>
			<path
				d="M15 5H3V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V5Z"
				fill="black"
			/>
		</svg>
	);
};
