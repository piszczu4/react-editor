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
				d="M13.62 10.08L12.1 4.66H12.04L10.54 10.08H13.62ZM5.7 11.13L4.53 7.02H4.45L3.32 11.13H5.7ZM17.31 15H15.06L14.11 11.75H10.04L9.09 15H6.84L6.15 12.67H2.87L2.17 15H0L3.3 5.41H5.8L7.97 11.75L10.86 3H13.38L17.32 15H17.31Z"
				fill="black"
			/>
		</svg>
	);
};
