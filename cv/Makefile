# CV build
# Full TeX Live / Overleaf: open backend.tex or hpc.tex (they \input preamble.tex).
# Local (this repo, no sudo): uses a user-local Tectonic binary.
#   make            -> builds both PDFs into ../public/
#   make backend    -> backend variant only
#   make hpc        -> hpc variant only
TECTONIC ?= /tmp/opencode/tectonic/tectonic
OUTDIR ?= ../public

all: backend hpc default

backend:
	$(TECTONIC) -X compile backend.tex --outdir $(OUTDIR)
	mv $(OUTDIR)/backend.pdf $(OUTDIR)/elia_gatti_cv_backend.pdf

hpc:
	$(TECTONIC) -X compile hpc.tex --outdir $(OUTDIR)
	mv $(OUTDIR)/hpc.pdf $(OUTDIR)/elia_gatti_cv_hpc.pdf

# Keep the legacy URL alive: site navbar + old links point here.
default: backend
	cp $(OUTDIR)/elia_gatti_cv_backend.pdf $(OUTDIR)/elia_gatti_cv.pdf

check:
	pdftotext $(OUTDIR)/elia_gatti_cv_backend.pdf - | head -8
	pdftotext $(OUTDIR)/elia_gatti_cv_hpc.pdf - | head -8
