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
			<path d="M5 3H7V5H5V3Z" fill="black" />
			<path d="M5 8H7V10H5V8Z" fill="black" />
			<path d="M10 8H12V10H10V8Z" fill="black" />
			<path d="M10 13H12V15H10V13Z" fill="black" />
			<path d="M10 3H12V5H10V3Z" fill="black" />
			<path d="M5 13H7V15H5V13Z" fill="black" />
		</svg>
	);
};
