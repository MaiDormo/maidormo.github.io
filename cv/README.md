# CV sources

Canonical LaTeX sources (Overleaf-compatible, full TeX Live):

- `preamble.tex`: shared packages, colors, `joblong` / `projectdivider` macros.
  (No icon fonts: plain-text links keep ATS extraction clean.)
  ATS hygiene (`cmap`, `glyphtounicode`, `\pdfgentounicode`) is applied on
  pdfTeX only; XeTeX emits Unicode natively so it is skipped there.
- `backend.tex`: backend-first variant. Default for recruiters and the site
  CV button. Project order: distributed storage, MPEG-DASH, SpMV, Guardian,
  DWT-SVD. Skills foreground Go/TypeScript/PostgreSQL alongside C/C++/Java/Python.
- `hpc.tex`: HPC/GPU-first variant for labs, GPU-platform and video-infra
  engineering roles. Project order: SpMV (incl. V2 details), MST (MPI+OpenMP),
  distributed storage, Guardian, DWT-SVD.

Build locally with the user-local Tectonic binary (no sudo needed):

```
cd cv && make
```

Outputs in `public/`: `elia_gatti_cv_backend.pdf`,
`elia_gatti_cv_hpc.pdf`, and `elia_gatti_cv.pdf` (copy of backend, keeps the
legacy URL alive).

Which to send where: see `docs/targets.md`.
Numbers policy: no invented metrics, no forward-looking claims on the CV.
When the cloud-GPU rerun lands (runbook: `docs/benchmarks.md`), add the
measured line directly.
