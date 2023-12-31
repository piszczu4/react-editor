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
				d="M5 7L1 7L1 5L5 5L5 1L7 1L7 5C7 6.10457 6.10457 7 5 7Z"
				fill="black"
			/>
			<path
				d="M17 5V7L13 7C11.8954 7 11 6.10457 11 5L11 1L13 1L13 5L17 5Z"
				fill="black"
			/>
			<path
				d="M5 17H7L7 13C7 11.8954 6.10457 11 5 11L1 11L1 13L5 13L5 17Z"
				fill="black"
			/>
			<path
				d="M13 17H11V13C11 11.8954 11.8954 11 13 11H17V13H13V17Z"
				fill="black"
			/>
		</svg>
	);
};
