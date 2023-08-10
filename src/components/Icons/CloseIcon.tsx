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
				d="M15 4.41L13.59 3L9 7.59L4.41 3L3 4.41L7.59 9L3 13.59L4.41 15L9 10.41L13.59 15L15 13.59L10.41 9L15 4.41Z"
				fill="black"
			/>
		</svg>
	);
};
