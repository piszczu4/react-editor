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
				d="M1 3C1 1.89543 1.89543 1 3 1H15C16.1046 1 17 1.89543 17 3V15C17 16.1046 16.1046 17 15 17H3C1.89543 17 1 16.1046 1 15V3ZM8 7V3H3V7H8ZM8 11V9H3V11H8ZM15 9H10V11H15V9ZM15 15V13H10V15H15ZM8 13H3V15H8V13ZM15 3H10V7H15V3Z"
				fill="black"
			/>
		</svg>
	);
};
