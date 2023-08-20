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
				d="M13.485 11.929l2.122-2.121a1 1 0 00-1.415-1.415l-2.12 2.122L9.95 8.393a1 1 0 00-1.414 1.415l2.12 2.12-2.12 2.122a1 1 0 001.414 1.414l2.121-2.12 2.121 2.12a1 1 0 101.415-1.414l-2.122-2.121zM12 20a8 8 0 110-16 8 8 0 010 16z"
				fill={color}
				fillRule="evenodd"
			/>
		</svg>
	);
};
