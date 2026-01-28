export function htmlToPlainText(html: string) {
  if (!html) {
    console.warn('No html found')
    return ""
  }
  const BLOCK_TAGS =
    /<\/(p|div|h1|h2|h3|h4|h5|h6|li|ul|ol|blockquote|pre|section|article|header|footer|tr|table)>/gi

  const BREAK_TAGS = /<br\s*\/?>/gi

  const div = document.createElement("div")

  const normalized = html
    .replace(BREAK_TAGS, "\n")
    .replace(BLOCK_TAGS, "\n")

  div.innerHTML = normalized

  return div.textContent
    ?.replace(/\n{3,}/g, "\n\n") // prevent too many blank lines
    .trim() ?? ""
}
