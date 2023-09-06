
export const mathPasteHandler =
	(type: string) =>
	({ match, chain, range, commands, state }: any) => {
		if (match[1]) {
			let $from = state.tr.doc.resolve(range.from);
			let pos = range.from;

			chain()
				.deleteRange(range)
				.command(({ commands }: any) => {
					if ($from.nodeBefore && type === "math_display") {
						commands.insertContentAt(pos, {
							type: "paragraph",
							attrs: {},
						});
						pos += 2;
					}
				})
				.insertContentAt(pos, {
					type: type,
					attrs: {},
					content: [
						{
							type: "text",
							text: match[1],
						},
					],
				})
				.command(({ commands }: any) => {
					if (type === "math_display") {
						commands.insertContentAt(pos + match[1].length, {
							type: "paragraph",
							attrs: {},
						});
					}
				});
		}
	};
