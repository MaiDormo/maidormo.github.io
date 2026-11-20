# CV sources

The master CV is the one-page HPC/GPU variant. It is mirrored here so the site
can rebuild it without leaving the repo.

- `preamble.tex`: shared packages, colors, `joblong` / `projectdivider` macros.
  No icon fonts: plain-text links keep ATS extraction clean. ATS hygiene
  (`cmap`, `glyphtounicode`, `\pdfgentounicode`) is applied on pdfTeX only;
  XeTeX emits Unicode natively so it is skipped there.
- `hpc.tex`: **default and master**. Headline `Software Engineer (HPC & GPU)`;
  project order: `dist-patoh` thesis, SpMV, parallel MST, distributed KV;
  CTM achievement; no Guardian, no Hybrid V2.
- `backend.tex`: legacy backend-first variant, kept only for old links and
  comparison. It is **not** the default and is not maintained.
- `backend.typ`: Typst port of the legacy backend variant. Not used by the site.

Build locally with the user-local Tectonic binary (no sudo needed):

```
cd cv && make
```

Outputs in `public/`: `elia_gatti_cv.pdf` (master) and
`elia_gatti_cv_hpc.pdf` (same build, legacy name). `elia_gatti_cv_backend.pdf`
is only rebuilt on demand with `make backend`.

Numbers policy: no invented metrics, no forward-looking claims, no technique
that is not in the code. The evidence map for every bullet is in
`~/projects/cv/CLAIMS.md`. The benchmark runbook is `docs/benchmarks.md`.
