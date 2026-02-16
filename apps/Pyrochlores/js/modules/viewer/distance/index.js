/* js/modules/viewer/distance/index.js */
import { DEFAULT_CUTOFFS } from './constants.js';

export { renderDistanceView } from './renderer.js';

// Export default cutoff helper for the UI event listener
export function getDefaultCutoff(type) {
    return DEFAULT_CUTOFFS[type] || 3.0;
}