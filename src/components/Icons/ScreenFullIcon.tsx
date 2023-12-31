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
			<path d="M3 1H7V3H3V7H1V3C1 1.89543 1.89543 1 3 1Z" fill="black" />
			<path d="M11 3V1H15C16.1046 1 17 1.89543 17 3V7H15V3H11Z" fill="black" />
			<path d="M3 11H1V15C1 16.1046 1.89543 17 3 17H7V15H3V11Z" fill="black" />
			<path
				d="M15 11H17V15C17 16.1046 16.1046 17 15 17H11V15H15V11Z"
				fill="black"
			/>
		</svg>
	);
};
