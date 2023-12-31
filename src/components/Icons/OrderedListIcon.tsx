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
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 6H4V2H2V3H3V6ZM3.8 8H2V7H5V7.9L3.2 10H5V11H2V10.1L3.8 8ZM2 13V12H5V16H2V15H4V14.5H3V13.5H4V13H2ZM7 5V3H16V5H7ZM7 15H16V13H7V15ZM16 10H7V8H16V10Z"
				fill="black"
			/>
		</svg>
	);
};
