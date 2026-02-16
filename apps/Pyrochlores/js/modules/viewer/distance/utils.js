/* js/modules/viewer/distance/utils.js */
export function mapTypeToSym(t, A, B) {
    if (t === 'A') return A;
    if (t === 'B') return B;
    if (t === 'O') return 'O';
    return t;
}

/**
 * Interpolates color from Blue (short) -> White (mid) -> Red (long)
 * @param {number} t - Normalized value between 0 and 1
 * @returns {string} - CSS rgb color string
 */
export function interpolateColor(t) {
    let r, g, b;

    if (t < 0.5) {
        // Blue (0,0,255) to White (255,255,255)
        // t goes 0 -> 0.5. Normalize to 0 -> 1
        const n = t * 2; 
        r = Math.floor(n * 255);
        g = Math.floor(n * 255);
        b = 255;
    } else {
        // White (255,255,255) to Red (255,0,0)
        // t goes 0.5 -> 1.0. Normalize to 0 -> 1
        const n = (t - 0.5) * 2; 
        r = 255;
        g = Math.floor((1 - n) * 255);
        b = Math.floor((1 - n) * 255);
    }
    
    return `rgb(${r},${g},${b})`;
}