/**
 * Maps each MBTI letter to its Tailwind text color utility class.
 * Color variables are defined in globals.css under @theme inline.
 */
export function getMBTILetterColor(letter: string): string {
  switch (letter) {
    case 'E': return 'text-energy-e';
    case 'I': return 'text-energy-i';
    case 'S': return 'text-info-s';
    case 'N': return 'text-info-n';
    case 'T': return 'text-decision-t';
    case 'F': return 'text-decision-f';
    case 'J': return 'text-lifestyle-j';
    case 'P': return 'text-lifestyle-p';
    default:  return 'text-foreground';
  }
}

/**
 * Returns the CSS variable value for a given MBTI letter (for inline styles).
 */
export function getMBTILetterCSSVar(letter: string): string {
  switch (letter) {
    case 'E': return 'var(--color-energy-e)';
    case 'I': return 'var(--color-energy-i)';
    case 'S': return 'var(--color-info-s)';
    case 'N': return 'var(--color-info-n)';
    case 'T': return 'var(--color-decision-t)';
    case 'F': return 'var(--color-decision-f)';
    case 'J': return 'var(--color-lifestyle-j)';
    case 'P': return 'var(--color-lifestyle-p)';
    default:  return 'var(--color-foreground)';
  }
}
