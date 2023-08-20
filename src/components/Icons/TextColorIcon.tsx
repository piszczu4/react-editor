type Props = {
	className?: string;
	color: string;
};

export default ({ className, color }: Props) => {
	return (
		<svg
			className={className}
			version="1.1"
			id="Warstwa_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 18 18"
			width="18"
			height="18"
		>
			<rect style={{ fill: "none" }} className="st0" width="18" height="18" />
			<g>
				<path d="M11,9.8H6.9l-0.6,1.3H4.1l3.6-8.5h2.3l3.7,8.5h-2.2L11,9.8z M10.3,8.2L8.9,5L7.6,8.2H10.3z" />
			</g>
			<g>
				<rect x="2.8" y="12.7" width="12.4" height="2.7" fill={color} />
			</g>
		</svg>
	);
};
