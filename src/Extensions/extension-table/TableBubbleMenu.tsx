import { BubbleMenu, Editor, getNodeAttributes } from "@tiptap/react";

type TableBubbleMenuProps = { editor: Editor };

export function TableBubbleMenu({ editor }: TableBubbleMenuProps) {
	return (
		<BubbleMenu
			pluginKey={"tableBubbleMenu"}
			editor={editor}
			tippyOptions={{ maxWidth: "100%" }}
			updateDelay={0}
			shouldShow={(props) => {
				return props.editor.isActive("table");
			}}
			className="mw-5 bs-ring bc-blue-300"
		>
			<span>
				<div className="mw-popover" role="menu">
					<div className="d-flex ai-center">
						<div>
							<button
								onClick={() => editor.chain().focus().addColumnBefore().run()}
							>
								addColumnBefore
							</button>
							<button
								onClick={() => editor.chain().focus().addColumnAfter().run()}
							>
								addColumnAfter
							</button>
							<button
								onClick={() => editor.chain().focus().deleteColumn().run()}
							>
								deleteColumn
							</button>
						</div>

						<div>
							<button
								onClick={() => editor.chain().focus().addRowBefore().run()}
							>
								addRowBefore
							</button>
							<button
								onClick={() => editor.chain().focus().addRowAfter().run()}
							>
								addRowAfter
							</button>
							<button onClick={() => editor.chain().focus().deleteRow().run()}>
								deleteRow
							</button>
							<button
								onClick={() => editor.chain().focus().deleteTable().run()}
							>
								deleteTable
							</button>
						</div>

						<div>
							<button onClick={() => editor.chain().focus().mergeCells().run()}>
								mergeCells
							</button>
							<button onClick={() => editor.chain().focus().splitCell().run()}>
								splitCell
							</button>
							<button
								onClick={() =>
									editor.chain().focus().toggleHeaderColumn().run()
								}
							>
								toggleHeaderColumn
							</button>
							<button
								onClick={() => editor.chain().focus().toggleHeaderRow().run()}
							>
								toggleHeaderRow
							</button>
							<button
								onClick={() => editor.chain().focus().toggleHeaderCell().run()}
							>
								toggleHeaderCell
							</button>
						</div>

						<button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
							mergeOrSplit
						</button>
						<button
							onClick={() =>
								editor.chain().focus().setCellAttribute("colspan", 2).run()
							}
						>
							setCellAttribute
						</button>
						<button onClick={() => editor.chain().focus().fixTables().run()}>
							fixTables
						</button>
						<button onClick={() => editor.chain().focus().goToNextCell().run()}>
							goToNextCell
						</button>
						<button
							onClick={() => editor.chain().focus().goToPreviousCell().run()}
						>
							goToPreviousCell
						</button>
					</div>
				</div>
			</span>
		</BubbleMenu>
	);
}
