---
layout: default
title: Documents — Muath Hamidi
description: Research documents, notes, and technical logs shared by Muath Hamidi.
---

<h1>Documents</h1>
<p>Research documents, technical logs, and working notes.</p>

<div class="app-grid" id="docGrid">

    <!-- ==================== PUBLIC DOCUMENTS ==================== -->

    <!-- No public documents yet — section reserved for future entries -->

    <!-- ==================== LOCKED DOCUMENTS ==================== -->

    <div class="app-card animate-on-scroll doc-locked" data-name="CeIn3 AiiDA QE Phase 5">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/documents/CeIn3_Aiida_QE_5/CeIn3_Aiida_QE_5.html">CeIn₃ AiiDA QE — Phase 5</a></h3>
        <p>Persistent SCF non-convergence in a collinear DFT+U calculation on CeIn₃ with an interstitial positive muon.</p>
        <span class="app-link">Open →</span>
    </div>

    <div class="app-card animate-on-scroll doc-locked" data-name="CeIn3 AiiDA QE Output Explorer">
        <span class="app-category physics">Physics</span>
        <h3><a href="{{ site.baseurl }}/documents/CeIn3_Aiida_QE_5/CeIn3_Aiida_QE_5_Output/CeIn3_Aiida_QE_5_Output.html">CeIn₃ AiiDA QE Output Explorer</a></h3>
        <p>Browse and inspect Quantum ESPRESSO .out files from AiiDA calculations on CeIn₃ (Phase 5).</p>
        <span class="app-link">Open →</span>
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
        <span class="dcdot" data-pos="0"></span>
        <span class="dcdot" data-pos="1"></span>
        <span class="dcdot" data-pos="2"></span>
        <span class="dcdot" data-pos="3"></span>
    </div>
    <input id="doc-code-input" type="password" inputmode="numeric" maxlength="4"
        autocomplete="off" autocorrect="off" spellcheck="false"
        aria-label="Enter documents unlock code"
        style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none;">
    <span id="doc-unlock-hint" style="font-size:0.75rem;color:var(--text-muted,#8b92a5);opacity:0.5;user-select:none;transition:opacity 0.2s;">click to enter code</span>
</div>

<style>
/* Locked document cards hidden by default */
.doc-locked {
    display: none !important;
}
.doc-locked.doc-visible {
    display: flex !important;
    animation: docReveal 0.4s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes docReveal {
    from { opacity: 0; transform: translateY(14px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
}
@keyframes docBarShake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-5px); }
    40%      { transform: translateX(5px); }
    60%      { transform: translateX(-3px); }
    80%      { transform: translateX(3px); }
}
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
#doc-unlock-bar:focus-within,
#doc-unlock-bar.focused {
    border-color: rgba(108,99,255,0.4);
    box-shadow: 0 0 0 3px rgba(108,99,255,0.08);
}
#doc-unlock-bar.shake {
    animation: docBarShake 0.38s ease;
}
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

// Restore session unlock
if (sessionStorage.getItem(DOC_SESSION_KEY) === '1') {
    revealDocuments(false);
}

docBar.addEventListener('click', () => docInput.focus());

docInput.addEventListener('focus', () => {
    docBar.classList.add('focused');
    docHint.style.opacity = '0';
});
docInput.addEventListener('blur', () => {
    docBar.classList.remove('focused');
    if (!sessionStorage.getItem(DOC_SESSION_KEY)) {
        docHint.style.opacity = '0.5';
    }
});

docInput.addEventListener('input', () => {
    docInput.value = docInput.value.replace(/\D/g, '').slice(0, 4);
    updateDocDots(docInput.value);

    if (docInput.value.length === 4) {
        if (docInput.value === DOC_PASSCODE) {
            sessionStorage.setItem(DOC_SESSION_KEY, '1');
            revealDocuments(true);
        } else {
            wrongDocCode();
        }
    }
});

function updateDocDots(val) {
    docDots.forEach((dot, i) => {
        dot.classList.toggle('filled', i < val.length);
        dot.classList.remove('error');
    });
}

function wrongDocCode() {
    docDots.forEach(d => { d.classList.remove('filled'); d.classList.add('error'); });
    docBar.classList.add('shake');
    docBar.addEventListener('animationend', () => docBar.classList.remove('shake'), { once: true });
    setTimeout(() => {
        docInput.value = '';
        updateDocDots('');
    }, 500);
}

function revealDocuments(animate) {
    docBar.classList.add('unlocked');
    docLockIcon.textContent = '🔓';
    docHint.textContent = 'unlocked';
    docHint.style.opacity = '0.5';
    docDots.forEach(d => { d.classList.add('filled'); d.classList.remove('error'); });

    const cards = document.querySelectorAll('.doc-locked');
    cards.forEach((card, i) => {
        if (animate) {
            card.style.animationDelay = `${i * 60}ms`;
        } else {
            card.style.animation = 'none';
        }
        card.classList.add('doc-visible');
    });
}

// Card click redirection
document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const link = card.querySelector('h3 a');
        if (link) {
            if (e.ctrlKey || e.metaKey) { window.open(link.href, '_blank'); }
            else { window.location.href = link.href; }
        }
    });
});
</script>
