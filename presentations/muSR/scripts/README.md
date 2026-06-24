# CeIn3 DFT+μ Hyperfine Field Pipeline

Automated workflow to compute the muon hyperfine field at the interstitial
stopping site in CeIn3 using DFT (Quantum ESPRESSO 7.5) via AiiDA.

## Quick Start

```bash
verdi run run_pipeline.py
```

Or in background:
```bash
nohup verdi run run_pipeline.py > pipeline.log 2>&1 &
```

## Pipeline Steps

| Step | File | Description | HPC |
|------|------|-------------|-----|
| 1 | `step1_pristine_scf.py` | Pristine FR-SCF + electrostatic map | 1 node, 2h |
| 2 | `step2_void_scan.py` | Electrostatic void scan → muon site | Local |
| 3 | `step3_muon_relax.py` | 2×2×2 supercell muon BFGS relaxation | 2 nodes, 72h |
| 3b | `step3b_extract_coords.py` | Extract relaxed muon coordinates | Local |
| 4 | `step4_afm_scf.py` | (111) AFM noncollinear magnetic SCF | 8 nodes, 24h |
| 4b | `step4b_spin_density.py` | Spin density pp.x extraction | 1 node, 30min |
| 5 | `step5_hyperfine.py` | Fermi contact + dipolar → |Bμ| | Local |

## File Structure

```
scripts/
├── config.py              # Shared configuration, helpers, structure builders
├── run_pipeline.py        # Master controller (runs all steps)
├── step1_pristine_scf.py  # Step 1
├── step2_void_scan.py     # Step 2
├── step3_muon_relax.py    # Step 3
├── step3b_extract_coords.py # Step 3b
├── step4_afm_scf.py       # Step 4
├── step4b_spin_density.py # Step 4b
├── step5_hyperfine.py     # Step 5
└── README.md              # This file
```

## Configuration

Edit `config.py` to change:
- `FRESH_RUN` — `True` for timestamped isolated runs, `False` to reuse directories
- `PW_CODE` / `PP_CODE` — AiiDA code labels for pw.x and pp.x
- `LATTICE_CONST` — CeIn3 experimental lattice constant (4.689 Å)
- `PSEUDO_GROUP` — AiiDA group label for FR pseudopotentials

## Checkpoint System

The pipeline saves progress to `checkpoint.json` after each HPC step.
If interrupted, re-running `run_pipeline.py` will skip completed steps
and resume from where it left off.

## References

- Blundell (1999) — Spin-polarized muons in condensed matter physics
- Onuorah et al. — DFT+μ methodology for muon site determination
