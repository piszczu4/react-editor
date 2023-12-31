type Props = {
	className?: string;
};

export default ({ className }: Props) => {
	return (
		<svg
			className={className}
			width="17"
			height="18"
			viewBox="0 0 17 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0 4C0 2.89543 0.89543 2 2 2H6C7.10457 2 8 2.89543 8 4V13L6.25 16H4L5.75 13H2C0.895431 13 0 12.1046 0 11V4Z"
				fill="black"
			/>
			<path
				d="M9 4C9 2.89543 9.89543 2 11 2H15C16.1046 2 17 2.89543 17 4V13L15.25 16H13L14.75 13H11C9.89543 13 9 12.1046 9 11V4Z"
				fill="black"
			/>
		</svg>
	);
};
