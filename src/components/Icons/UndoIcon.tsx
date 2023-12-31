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
				d="M3.35147 3.35C4.80238 1.9 6.79362 1 9.005 1C13.4278 1 17 4.58 17 9C17 13.42 13.4278 17 9.005 17C5.27267 17 2.16073 14.45 1.27017 11H3.35147C4.17198 13.33 6.39337 15 9.005 15C12.3171 15 15.0088 12.31 15.0088 9C15.0088 5.69 12.3171 3 9.005 3C7.34396 3 5.86304 3.69 4.78236 4.78L8.00438 8H1V1L3.35147 3.35Z"
				fill="black"
			/>
		</svg>
	);
};
