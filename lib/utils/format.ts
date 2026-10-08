/**
 * Fill `{placeholder}` slots in a copy string. Copy stays in lib/content (CLAUDE.md §0)
 * and components only supply the values.
 */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = vars[key];
    return value === undefined ? match : String(value);
  });
}

/** Drop blank lines left behind by an omitted optional field. */
export function compactLines(text: string): string {
  return text
    .split('\n')
    .filter((line, index, lines) => line.trim() !== '' || isParagraphBreak(lines, index))
    .join('\n')
    .trim();
}

function isParagraphBreak(lines: string[], index: number): boolean {
  const previous = lines[index - 1];
  const next = lines[index + 1];
  return previous?.trim() !== '' && next?.trim() !== '' && next !== undefined;
}

/**
 * Pakistani mobile numbers as people type them: 03XXXXXXXXX or +923XXXXXXXXX,
 * with spaces or dashes anywhere (CLAUDE.md §7.4).
 */
export function isPakistaniMobile(value: string): boolean {
  const digits = value.replace(/[\s-]/g, '');
  return /^(?:03\d{9}|\+923\d{9}|00923\d{9})$/.test(digits);
}
