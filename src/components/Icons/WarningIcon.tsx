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
				d="M13.31 5.343l7.359 13.17A1 1 0 0119.796 20H4.204a1 1 0 01-.873-1.488l7.36-13.169a1.5 1.5 0 012.618 0zM12 8.5a1.091 1.091 0 00-1.081 1.239l.513 3.766a.573.573 0 001.136 0l.513-3.766A1.091 1.091 0 0012 8.5zm0 8.63a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
				fill={color}
				fillRule="evenodd"
			/>
		</svg>
	);
};
