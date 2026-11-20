# CV build
# Full TeX Live / Overleaf: open backend.tex or hpc.tex (they \input preamble.tex).
# Local (this repo, no sudo): uses a user-local Tectonic binary.
#   make            -> builds both PDFs into ../public/
#   make backend    -> backend variant only
#   make hpc        -> hpc variant only
TECTONIC ?= /tmp/opencode/tectonic/tectonic
OUTDIR ?= ../public

all: hpc default

backend:
	$(TECTONIC) -X compile backend.tex --outdir $(OUTDIR)
	mv $(OUTDIR)/backend.pdf $(OUTDIR)/elia_gatti_cv_backend.pdf

hpc:
	$(TECTONIC) -X compile hpc.tex --outdir $(OUTDIR)
	mv $(OUTDIR)/hpc.pdf $(OUTDIR)/elia_gatti_cv_hpc.pdf

# Keep the legacy URL alive: site navbar + old links point here.
default: hpc
	cp $(OUTDIR)/elia_gatti_cv_hpc.pdf $(OUTDIR)/elia_gatti_cv.pdf
	cp $(OUTDIR)/elia_gatti_cv_hpc.pdf $(OUTDIR)/Elia_Gatti_CV.pdf

check:
	pdftotext $(OUTDIR)/elia_gatti_cv_hpc.pdf - | head -12
	pdftotext $(OUTDIR)/elia_gatti_cv.pdf - | head -12

# Typst port (1:1 with backend.tex). Writes a _typst-suffixed PDF, never
# overwrites the tectonic artifacts above.
typst:
	typst compile backend.typ $(OUTDIR)/elia_gatti_cv_backend_typst.pdf
