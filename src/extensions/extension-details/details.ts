import {
	Node,
	mergeAttributes,
	findParentNode,
	findChildren,
} from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		details: {
			setDetails: () => ReturnType;
			unsetDetails: () => ReturnType;
		};
	}
}

type DetailsOptions = {
	persist: boolean;
	openClassName: string;
	HTMLAttributes: Record<string, any>;
};

export const Details = Node.create<DetailsOptions>({
	name: "details",
	content: "detailsSummary detailsContent",
	group: "block",
	defining: true,
	isolating: true,
	allowGapCursor: false,

	addOptions: () => ({
		persist: false,
		openClassName: "is-open",
		HTMLAttributes: {},
	}),

	addAttributes() {
		return this.options.persist
			? {
					open: {
						default: false,
						parseHTML: (element) => element.hasAttribute("open"),
						renderHTML: ({ open }) => (open ? { open: "" } : {}),
					},
			  }
			: [];
	},

	parseHTML: () => [{ tag: "details" }],

	renderHTML({ HTMLAttributes }) {
		return [
			"details",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addNodeView() {
		return ({ editor, getPos, node, HTMLAttributes }) => {
			const dom = document.createElement("div"),
				attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
					"data-type": this.name,
				});
			Object.entries(attrs).forEach(([t, e]) => dom.setAttribute(t, e));
			const a = document.createElement("button");
			dom.append(a);
			const d = document.createElement("div");
			dom.append(d);
			const c = () => {
				dom.classList.toggle(this.options.openClassName);
				const t = new Event("toggleDetailsContent"),
					e = d.querySelector(':scope > div[data-type="detailsContent"]');
				null == e || e.dispatchEvent(t);
			};
			return (
				node.attrs.open && setTimeout(c),
				a.addEventListener("click", () => {
					c(),
						this.options.persist
							? editor.isEditable &&
							  "function" == typeof getPos &&
							  editor
									.chain()
									.focus()
									.command(({ tr: t }) => {
										const e = getPos(),
											o = t.doc.nodeAt(e);
										return (
											(null == o ? void 0 : o.type) === this.type &&
											(t.setNodeMarkup(e, void 0, { open: !o?.attrs.open }), !0)
										);
									})
									.run()
							: editor.commands.focus();
				}),
				{
					dom: dom,
					contentDOM: d,
					// ignoreMutation: (t) =>
					// 	"selection" !== t.type && (!s.contains(t.target) || s === t.target),
					update: (t) => t.type === this.type,
				}
			);
		};
	},

	addCommands() {
		return {
			setDetails:
				() =>
				({ state, chain }) => {
					var n;
					const { schema: o, selection: r } = state,
						{ $from: s, $to: i } = r,
						a = s.blockRange(i);
					if (!a) return !1;
					const d = state.doc.slice(a.start, a.end);
					if (!o.nodes.detailsContent.contentMatch.matchFragment(d.content))
						return !1;
					const c =
						(null === (n = d.toJSON()) || void 0 === n ? void 0 : n.content) ||
						[];
					return chain()
						.insertContentAt(
							{ from: a.start, to: a.end },
							{
								type: this.name,
								content: [
									{ type: "detailsSummary" },
									{ type: "detailsContent", content: c },
								],
							}
						)
						.setTextSelection(a.start + 2)
						.run();
				},
			unsetDetails:
				() =>
				({ state, chain }) => {
					const { selection: o, schema: r } = state,
						s = findParentNode((t) => t.type === this.type)(o);
					if (!s) return !1;
					const i = findChildren(
							s.node,
							(t) => t.type === r.nodes.detailsSummary
						),
						a = findChildren(s.node, (t) => t.type === r.nodes.detailsContent);
					if (!i.length || !a.length) return !1;
					const d = i[0],
						c = a[0],
						l = s.pos,
						p = state.doc.resolve(l),
						u = { from: l, to: l + s.node.nodeSize },
						m = c.node.content.toJSON() || [],
						f = p.parent.type.contentMatch.defaultType,
						h = [
							null == f ? void 0 : f.create(null, d.node.content).toJSON(),
							...m,
						];
					return chain()
						.insertContentAt(u, h)
						.setTextSelection(l + 1)
						.run();
				},
		};
	},
});

// import { Details as TiptapDetails } from "@tiptap-pro/extension-details";

// export const Details = TiptapDetails.extend({
// 	addKeyboardShortcuts() {
// 		return {
// 			"Mod-Shift-D": () => this.editor.commands.setDetails(),
// 		};
// 	},
// });
