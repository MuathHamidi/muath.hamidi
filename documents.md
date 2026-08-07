---
layout: default
title: Documents — Muath Hamidi
description: Research documents, notes, and technical logs shared by Muath Hamidi.
---

<h1>Documents</h1>
<p>Research documents, technical logs, and working notes.</p>

<div class="app-grid" id="docGrid">

    <!-- ==================== LOCKED FOLDERS ==================== -->

    <!-- Folder: muSR_Aiida_QE -->
    <div class="doc-folder-group doc-locked" id="folder-musr">
        <div class="doc-folder-header animate-on-scroll">

            <div>
                <div class="doc-folder-name">muSR_Aiida_QE</div>
                <div class="doc-folder-desc">μSR pipeline on CeIn₃ using AiiDA + Quantum ESPRESSO</div>
            </div>
            <a href="{{ site.baseurl }}/documents/muSR_Aiida_QE/" class="doc-folder-link" title="Open folder page">Open folder →</a>
        </div>

        <div class="doc-folder-cards">
            <div class="app-card animate-on-scroll" data-name="Letter on CeIn3 AiiDA QE Phase 5">
                <span class="app-category physics">Physics</span>
                <h3><a href="{{ site.baseurl }}/documents/muSR_Aiida_QE/Letter_on_CeIn3_Aiida_QE_5.html">Letter on CeIn₃ AiiDA QE — Phase 5</a></h3>
                <p>Persistent SCF non-convergence in a collinear DFT+U calculation on CeIn₃ with an interstitial positive muon.</p>
                <span class="app-link">Open →</span>
            </div>

            <div class="app-card animate-on-scroll" data-name="CeIn3 AiiDA QE Output Explorer">
                <span class="app-category physics">Physics</span>
                <h3><a href="{{ site.baseurl }}/documents/muSR_Aiida_QE/CeIn3_Aiida_QE_5_Output/CeIn3_Aiida_QE_5_Output.html">CeIn₃ AiiDA QE Output Explorer</a></h3>
                <p>Browse and inspect Quantum ESPRESSO .out files from AiiDA calculations on CeIn₃ (Phase 5).</p>
                <span class="app-link">Open →</span>
            </div>
        </div>
    </div>

    <div class="no-results" id="noResults" style="display: none;">
        No documents match your search.
    </div>

</div>

<!-- ==================== DOCUMENTS UNLOCK BAR ==================== -->
<div id="doc-unlock-bar" style="
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 2.5rem;
    padding: 0.85rem 1.25rem;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
    width: fit-content;
    cursor: text;
    transition: border-color 0.3s, box-shadow 0.3s;
">
    <span id="doc-lock-icon" style="font-size: 1.1rem; line-height: 1; user-select: none;">🔒</span>
    <span style="font-size: 0.82rem; color: var(--text-muted, #8b92a5); white-space: nowrap; user-select: none;">Documents</span>
    <div id="doc-code-dots" style="display: flex; gap: 0.45rem; align-items: center;">
        <span class="dcdot"></span>
        <span class="dcdot"></span>
        <span class="dcdot"></span>
        <span class="dcdot"></span>
    </div>
    <input id="doc-code-input" type="password" inputmode="numeric" maxlength="4"
        autocomplete="off" autocorrect="off" spellcheck="false"
        aria-label="Enter documents unlock code"
        style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none;">
    <span id="doc-unlock-hint" style="font-size:0.75rem;color:var(--text-muted,#8b92a5);opacity:0.5;user-select:none;transition:opacity 0.2s;">click to enter code</span>
</div>

<style>
/* Hidden until unlocked */
.doc-locked { display: none !important; }
.doc-locked.doc-visible {
    display: block !important;
    animation: docReveal 0.4s cubic-bezier(0.22,1,0.36,1) both;
}

@keyframes docReveal {
    from { opacity: 0; transform: translateY(14px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
}
@keyframes docBarShake {
    0%,100% { transform: translateX(0); }
    20%     { transform: translateX(-5px); }
    40%     { transform: translateX(5px); }
    60%     { transform: translateX(-3px); }
    80%     { transform: translateX(3px); }
}

/* Folder group layout */
.doc-folder-group {
    width: 100%;
}
.doc-folder-header {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.85rem 1.1rem;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
    margin-bottom: 1rem;
}
.doc-folder-icon {
    font-size: 1.4rem;
    flex-shrink: 0;
}
.doc-folder-name {
    font-weight: 700;
    font-size: 0.95rem;
    font-family: var(--font-mono, monospace);
    letter-spacing: -0.01em;
}
.doc-folder-desc {
    font-size: 0.78rem;
    color: var(--text-secondary, #8b92a5);
    margin-top: 0.15rem;
}
.doc-folder-link {
    margin-left: auto;
    font-size: 0.78rem;
    color: var(--accent-primary, #6c63ff);
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    opacity: 0.8;
    transition: opacity 0.2s;
}
.doc-folder-link:hover { opacity: 1; }
.doc-folder-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
    padding-left: 1.5rem;
    border-left: 2px solid rgba(255,255,255,0.07);
    margin-left: 0.75rem;
}

/* PIN dots */
.dcdot {
    display: inline-block;
    width: 10px; height: 10px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.22);
    background: transparent;
    transition: background 0.15s, border-color 0.15s, transform 0.12s;
}
.dcdot.filled {
    background: var(--accent-primary, #6c63ff);
    border-color: var(--accent-primary, #6c63ff);
    transform: scale(1.2);
}
.dcdot.error {
    border-color: #ff6b6b;
    background: rgba(255,107,107,0.25);
}
#doc-unlock-bar:focus-within, #doc-unlock-bar.focused {
    border-color: rgba(108,99,255,0.4);
    box-shadow: 0 0 0 3px rgba(108,99,255,0.08);
}
#doc-unlock-bar.shake { animation: docBarShake 0.38s ease; }
#doc-unlock-bar.unlocked {
    border-color: rgba(0,210,100,0.35);
    box-shadow: 0 0 0 3px rgba(0,210,100,0.08);
}
</style>

<script>
const DOC_PASSCODE    = '1111';
const DOC_SESSION_KEY = 'documents_unlocked';

const docBar      = document.getElementById('doc-unlock-bar');
const docInput    = document.getElementById('doc-code-input');
const docDots     = document.querySelectorAll('.dcdot');
const docLockIcon = document.getElementById('doc-lock-icon');
const docHint     = document.getElementById('doc-unlock-hint');

if (sessionStorage.getItem(DOC_SESSION_KEY) === '1') revealDocuments(false);

docBar.addEventListener('click', () => docInput.focus());

docInput.addEventListener('focus', () => {
    docBar.classList.add('focused');
    docHint.style.opacity = '0';
});
docInput.addEventListener('blur', () => {
    docBar.classList.remove('focused');
    if (!sessionStorage.getItem(DOC_SESSION_KEY)) docHint.style.opacity = '0.5';
});
docInput.addEventListener('input', () => {
    docInput.value = docInput.value.replace(/\D/g, '').slice(0, 4);
    updateDots(docInput.value);
    if (docInput.value.length === 4) {
        if (docInput.value === DOC_PASSCODE) {
            sessionStorage.setItem(DOC_SESSION_KEY, '1');
            revealDocuments(true);
        } else {
            wrongCode();
        }
    }
});

function updateDots(val) {
    docDots.forEach((d, i) => {
        d.classList.toggle('filled', i < val.length);
        d.classList.remove('error');
    });
}
function wrongCode() {
    docDots.forEach(d => { d.classList.remove('filled'); d.classList.add('error'); });
    docBar.classList.add('shake');
    docBar.addEventListener('animationend', () => docBar.classList.remove('shake'), { once: true });
    setTimeout(() => { docInput.value = ''; updateDots(''); }, 500);
}
function revealDocuments(animate) {
    docBar.classList.add('unlocked');
    docLockIcon.textContent = '🔓';
    docHint.textContent = 'unlocked';
    docHint.style.opacity = '0.5';
    docDots.forEach(d => { d.classList.add('filled'); d.classList.remove('error'); });
    document.querySelectorAll('.doc-locked').forEach((el, i) => {
        if (!animate) el.style.animation = 'none';
        el.classList.add('doc-visible');
    });
}

// Card click redirection
document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        const link = card.querySelector('h3 a');
        if (link) {
            if (e.ctrlKey || e.metaKey) window.open(link.href, '_blank');
            else window.location.href = link.href;
        }
    });
});
</script>
