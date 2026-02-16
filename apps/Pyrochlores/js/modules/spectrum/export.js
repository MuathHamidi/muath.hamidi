/* js/modules/spectrum/export.js */
import { state } from '../../state.js';
// UPDATED IMPORT: Point to the new directory index
import { showToast } from '../ui/index.js';
import { THEMES } from './constants.js';
import { renderSpectrum } from './renderer/index.js';

export function initExportHandlers() {
    const modal = document.getElementById('export-modal');
    const openModalBtn = document.getElementById('btn-open-export');
    const closeModalBtn = document.getElementById('btn-close-modal');
    const downloadBtn = document.getElementById('btn-export-download');
    const copyBtn = document.getElementById('btn-export-copy');

    // Modal Inputs
    const wInput = document.getElementById('exp-width');
    const hInput = document.getElementById('exp-height');
    const fontInput = document.getElementById('exp-font');
    const markInput = document.getElementById('exp-marker');
    const fmtInput = document.getElementById('exp-format');
    const themeInput = document.getElementById('exp-theme');

    // Toggle Modal
    if (openModalBtn) openModalBtn.addEventListener('click', () => modal.style.display = 'flex');
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    // Options Helper
    const getOptions = () => ({
        width: parseInt(wInput.value) || 1200,
        height: parseInt(hInput.value) || 800,
        fontSize: parseInt(fontInput.value) || 18,
        markerSize: parseInt(markInput.value) || 20,
        format: fmtInput.value || 'png',
        theme: themeInput.value || 'dark',
        filename: `spectrum_${state.selectedA || 'A'}2${state.selectedB || 'B'}2O7`
    });

    // Helper: Apply custom styles, perform action, then revert
    const withCustomStyles = async (actionCallback) => {
        const graph = document.getElementById('spectrum-plot');
        if (!graph || !graph.data) {
            showToast('No chart available', 'error');
            return;
        }

        const opts = getOptions();
        const theme = THEMES[opts.theme];

        // 1. Prepare Style Updates
        const updateLayout = {
            'font.size': opts.fontSize,
            'font.color': theme.text,
            'paper_bgcolor': theme.bg,
            'plot_bgcolor': theme.bg,
            'xaxis.title.font.size': opts.fontSize + 4,
            'xaxis.title.font.color': theme.subtext,
            'xaxis.tickfont.size': opts.fontSize,
            'xaxis.tickfont.color': theme.subtext,
            'xaxis.gridcolor': theme.grid,
            'xaxis.zerolinecolor': theme.zeroline,
            'yaxis.tickfont.size': opts.fontSize,
            'yaxis.tickfont.color': theme.text,
            'yaxis.gridcolor': theme.grid,
            // Clear fixed margins
            'margin.l': null, 'margin.r': null, 'margin.t': null, 'margin.b': null,
            'margin.pad': 20,
            'xaxis.automargin': true,
            'yaxis.automargin': true
        };

        const updateTrace = {
            'marker.size': opts.markerSize,
            'marker.line.width': opts.markerSize / 8
        };

        try {
            await Plotly.relayout(graph, updateLayout);
            await Plotly.restyle(graph, updateTrace);
            await new Promise(r => setTimeout(r, 600)); // Wait for render
            await actionCallback(graph, opts);
        } catch (e) {
            console.error("Export Error:", e);
            showToast('Export failed. Check console.', 'error');
        } finally {
            renderSpectrum(); // Revert
        }
    };

    // Download Handler
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            withCustomStyles(async (graph, opts) => {
                if (opts.format === 'pdf') {
                    await Plotly.downloadImage(graph, {
                        format: 'pdf',
                        width: opts.width,
                        height: opts.height,
                        filename: opts.filename
                    });
                } else {
                    const dataUrl = await Plotly.toImage(graph, {
                        format: opts.format,
                        width: opts.width,
                        height: opts.height
                    });
                    const link = document.createElement('a');
                    link.download = `${opts.filename}.${opts.format}`;
                    link.href = dataUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                modal.style.display = 'none'; 
            });
        });
    }

    // Copy Handler
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            withCustomStyles(async (graph, opts) => {
                const url = await Plotly.toImage(graph, { 
                    format: 'png', 
                    width: opts.width, 
                    height: opts.height 
                });
                const blob = await (await fetch(url)).blob();
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                showToast('Copied to clipboard', 'success');
                modal.style.display = 'none';
            });
        });
    }
}