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
			<path d="M16 4H2V2H16V4Z" fill="black" />
			<path d="M8 6V8H16V6H8Z" fill="black" />
			<path d="M16 16H2V14H16V16Z" fill="black" />
			<path d="M8 12H16V10H8V12Z" fill="black" />
			<path d="M1.5 9L6 5V13L1.5 9Z" fill="black" />
		</svg>
	);
};
