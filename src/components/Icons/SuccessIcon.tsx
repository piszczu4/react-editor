type Props = {
	className?: string;
	color?: string;
};

export default ({ className, color = "currentColor" }: Props) => {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			role="presentation"
		>
			<path
				d="M12 20a8 8 0 110-16 8 8 0 010 16zm1.364-10.964l-2.152 4.11-1.543-1.39a1 1 0 10-1.338 1.487l2.5 2.25a1 1 0 001.555-.279l2.75-5.25a1 1 0 00-1.772-.928z"
				fill={color}
				fillRule="evenodd"
			/>
		</svg>
	);
};
