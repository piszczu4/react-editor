type Props = {
	className?: string;
	color: string;
};

export default ({ className, color }: Props) => {
	return (
		<svg
			className={className}
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M13 6C13 4.5 11.43 3 9.5 3H4V15H10.25C12.04 15 13.5 13.29 13.5 11.5C13.5 10.2 12.6 9.02 11.5 8.5C12.33 7.92 13 7.5 13 6ZM6.5 5H9C9.39782 5 9.77936 5.15804 10.0607 5.43934C10.342 5.72064 10.5 6.10218 10.5 6.5C10.5 6.89782 10.342 7.27936 10.0607 7.56066C9.77936 7.84196 9.39782 8 9 8H6.5V5ZM9.5 13H6.5V10H9.5C9.89782 10 10.2794 10.158 10.5607 10.4393C10.842 10.7206 11 11.1022 11 11.5C11 11.8978 10.842 12.2794 10.5607 12.5607C10.2794 12.842 9.89782 13 9.5 13Z"
				fill="black"
			/>
		</svg>
	);
};
