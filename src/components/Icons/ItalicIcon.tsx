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
				d="M7 3V5H9.58L5.92 13H3V15H11V13H8.42L12.08 5H15V3H7Z"
				fill="black"
			/>
		</svg>
	);
};
