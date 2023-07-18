import { Extension } from "@tiptap/react";


export const CodeIndent = Extension.create({
    name: "codeIndent",
    addKeyboardShortcuts() {
        return {
            Tab: () => {
                if (this.editor.isActive("codeBlock")) {
                    return this.editor.commands.insertContent("    ");
                }
                return false;
            },
            Backspace: () => {
                if (this.editor.isActive("codeBlock")) {
                    if (this.editor.state.selection.empty) {
                        let pos = this.editor.state.selection.from;
                        let fragment = this.editor.state.doc.cut(
                            pos - 4,
                            pos
                        ).textContent;
                        if (fragment === "    ") {
                            return this.editor.commands.command(({ tr }) => {
                                tr.deleteRange(pos - 4, pos);
                                return true;
                            });
                        }
                    }
                }
                return false;
            },
        };
    },
});