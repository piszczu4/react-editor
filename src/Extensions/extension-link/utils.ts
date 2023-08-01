// rudimentary link validation that's roughly in line with what Stack Overflow's backend uses for validation
const validLinkRegex =
	/^((https?|ftp):\/\/|\/)[-a-z0-9+&@#/%?=~_|!:,.;()*[\]$]+$/;
const validMailtoRegex = /^mailto:[#-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+$/;
/**
 * Checks if a url is well-formed and passes Stack Overflow's validation checks
 * @param url The url to validate
 */
export function stackOverflowValidateLink(url: string) {
	const normalizedUrl =
		url === null || url === void 0 ? void 0 : url.trim().toLowerCase();
	return (
		validLinkRegex.test(normalizedUrl!) || validMailtoRegex.test(normalizedUrl!)
	);
}
