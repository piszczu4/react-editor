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
				d="M13.68 2.15L15.85 4.32C16.05 4.52 16.05 4.83 15.85 5.03L14.5 6.39L11.62 3.51L12.97 2.15C13.17 1.95 13.48 1.95 13.68 2.15ZM2 13.13L10.5 4.63L13.38 7.51L4.88 16.01H2V13.13Z"
				fill="black"
			/>
		</svg>
	);
};
