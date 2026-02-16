// A nice palette of distinct colors
const PALETTE = [
    '#4cc9f0', // Cyan
    '#f72585', // Pink
    '#7209b7', // Purple
    '#f8961e', // Orange
    '#4361ee', // Blue
    '#b5179e', // Magenta
    '#3a0ca3', // Dark Blue
    '#f9c74f', // Yellow
    '#90be6d', // Green
    '#d90429'  // Red
];

let colorIndex = 0;

export function getNextColor() {
    const c = PALETTE[colorIndex % PALETTE.length];
    colorIndex++;
    return c;
}

export function resetColorIndex() {
    colorIndex = 0;
}

/**
 * Generates a consistent color for a given string (e.g., formula name).
 * This ensures "Dy2Ti2O7" is always the same color in the merger.
 */
export function getColorForString(str) {
    if (!str) return '#ffffff';
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Use hash to pick from PALETTE first (better design), fallback to generated
    const index = Math.abs(hash) % PALETTE.length;
    return PALETTE[index];
}