/* js/components/ResultsGrid.js */
import { getVisualizerCard } from './cards/VisualizerCard.js';
import { getDataCard } from './cards/DataCard.js';
import { getRawCard } from './cards/RawCard.js';
import { getDistanceCard } from './cards/DistanceCard.js';
import { getAnglesCard } from './cards/AnglesCard.js'; // NEW IMPORT
import { getSpectrumCard } from './cards/SpectrumCard.js';
import { getMergerCard } from './cards/MergerCard.js';
import { getHeatmapCard } from './cards/HeatmapCard.js';
import { getLatticeCard, getOxygenCard, getCorrelationCard } from './cards/StructureCards.js';

export function getResultsGridHTML() {
    return `
        <section class="results-grid">
            ${getVisualizerCard()}
            ${getDataCard()}
            ${getRawCard()}
            ${getDistanceCard()}
            ${getAnglesCard()}
            ${getSpectrumCard()}
            ${getMergerCard()}
            ${getHeatmapCard()}
            ${getLatticeCard()}
            ${getOxygenCard()}
            ${getCorrelationCard()}
        </section>
    `;
}