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
				d="M14.6485 3.35C13.1976 1.9 11.2064 1 8.995 1C4.57223 1 1 4.58 1 9C1 13.42 4.57223 17 8.995 17C12.7273 17 15.8393 14.45 16.7298 11H14.6485C13.828 13.33 11.6066 15 8.995 15C5.68293 15 2.99124 12.31 2.99124 9C2.99124 5.69 5.68293 3 8.995 3C10.656 3 12.137 3.69 13.2176 4.78L9.99562 8H17V1L14.6485 3.35Z"
				fill="black"
			/>
		</svg>
	);
};
