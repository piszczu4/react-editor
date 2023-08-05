/** Gets the modifier key for the current platform; i.e. "Command" on macOS and "Control" elsewhere */
export function getPlatformModKey() {
	return /Mac|iP(hone|[oa]d)/.test(navigator.platform) ? "Cmd" : "Ctrl";
}
/**
 * Returns a string containing the label and readable keyboard shortcut for button tooltips
 * @param mapping Corresponding command mapping (keyboard shortcut)
 */
export function getShortcut(mapping: string) {
	if (!mapping.startsWith("Mod-")) {
		return mapping;
	}
	return getPlatformModKey() + mapping.slice(3);
}
