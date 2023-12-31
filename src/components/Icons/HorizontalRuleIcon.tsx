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
			<path d="M2 8H16V10H2V8Z" fill="black" />
			<path
				opacity="0.4"
				d="M2 2H16V3H2V2ZM2 5H16V6H2V5ZM2 12H16V13H2V12ZM2 15H16V16H2V15Z"
				fill="black"
			/>
		</svg>
	);
};
