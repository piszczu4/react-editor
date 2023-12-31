type Props = {
	className?: string;
};

export default ({ className }: Props) => {
	return (
		<svg
			className={className}
			width="17"
			height="18"
			viewBox="0 0 17 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4.25 4C4.25 4.69036 3.69036 5.25 3 5.25C2.30964 5.25 1.75 4.69036 1.75 4C1.75 3.30964 2.30964 2.75 3 2.75C3.69036 2.75 4.25 3.30964 4.25 4Z"
				fill="black"
			/>
			<path d="M15 5H6V3H15V5Z" fill="black" />
			<path d="M15 15H6V13H15V15Z" fill="black" />
			<path d="M6 10H15V8H6V10Z" fill="black" />
			<path
				d="M4.25 14C4.25 14.6904 3.69036 15.25 3 15.25C2.30964 15.25 1.75 14.6904 1.75 14C1.75 13.3096 2.30964 12.75 3 12.75C3.69036 12.75 4.25 13.3096 4.25 14Z"
				fill="black"
			/>
			<path
				d="M3 10.25C3.69036 10.25 4.25 9.69036 4.25 9C4.25 8.30964 3.69036 7.75 3 7.75C2.30964 7.75 1.75 8.30964 1.75 9C1.75 9.69036 2.30964 10.25 3 10.25Z"
				fill="black"
			/>
		</svg>
	);
};
