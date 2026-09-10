# Benchmark runbook: fill the missing numbers without inventing them

Both CV variants deliberately say "planned" instead of quoting metrics you
haven't measured. This runbook gets you the numbers for ~$10–30 of cloud GPU.

## 1. SpMV roofline + Nsight (feeds HPC CV + `cuda-SpMV` README)

**Where:** any cloud with an NVIDIA GPU. Cheapest honest options:

- RunPod / Vast.ai: RTX 3090/4090 or A40 spot, ~$0.30–0.80/hr.
- Lambda Labs: A10/A100 on-demand, ~$0.60–1.50/hr.
- GCP free trial: T4, slower but free; fine for correctness, weak for roofline.

**Steps (same repo, `MaiDormo/cuda-SpMV`):**

1. Clone + download matrices: `./scripts/download_matrices.sh`
2. Fix arch for the rented GPU in `Makefile` (`RELEASE_NV_OPT`):
   RTX 3090/4090 → `sm_86` / `sm_89`; A10/A40 → `sm_86`; A100 → `sm_80`; T4 → `sm_75`.
   Then `make clean && make`.
   Cloud images have no UniTN module system: build with `make local`
   (direct `nvcc`, no `module load`), or apply the auto-detect patch
   (Makefile sets `LOCAL := 1` when `/etc/profile.d/modules.sh` is absent).
   If `which nvcc` is empty, `export PATH=/usr/local/cuda/bin:$PATH` first.
3. Correctness first: every driver prints `Verification (...): PASS/FAIL`.
4. Timing: run each matrix x5 with `flush_l2=1` on the Hybrid V2 binary,
   record median + GFLOPS + GB/s from the CSV extract scripts.
5. Baseline: compile `test/cusparse.cu` via `test/compile.sh`, same matrices.
6. Roofline (needs Nsight Compute, available on RunPod/Lambda images):
   `ncu --metrics sm__throughput.avg.pct_of_peak_sustained_elapsed,dram__throughput.avg.pct_of_peak_sustained_elapsed ./bin/spmv_gpu_hybrid_v2_csr.exec data/<mtx>/<mtx>.mtx`
   Record achieved % of peak + top 3 limiters per kernel.

**What to write down (per matrix):** rows, nnz, longest row, median ms,
GFLOPS, GB/s, % of cuSPARSE, Nsight top limiter. Minimum publishable set:
3 matrices (one small/L2-resident e.g. `662_bus`, one medium, one huge-row
e.g. `mawi`). Paste the table into the `cuda-SpMV` README, then replace the
CV line "roofline rerun planned" with e.g. "1.8x cuSPARSE on X, DRAM-bound
per Nsight".

Budget: 2–4 GPU-hours total if scripts are ready. **Do not** pay for
multi-GPU. You don't need NCCL for this story.

## 2. Parallel MST rerun (feeds HPC CV + `parallel_mst` README)

Cloud single-node with many vCPUs is enough; the cluster story is already
told by the course report. On a 16–32 vCPU box (Hetzner AX41 ~€30/mo,
or any spot CPU):

1. `./hpc_tools_local.sh compile && ./hpc_tools_local.sh generate-graphs`
2. `./hpc_tools_local.sh benchmark`, then `compare`.
3. Record: nodes/edges, threads, wall time serial vs OpenMP vs MPI,
   I/O time separately (mmap claim), speedup + efficiency.

If the old cluster numbers exist in `HPC_Report_Bitussi_Gatti.pdf`, quote
_those_ with the dataset size instead of rerunning. Rerun only to confirm
the I/O claim locally.

## 3. Backend proof you can do with $0 (feeds backend CV)

No GPU needed:

- One Go service: REST + Postgres + Docker + tests + Prometheus metrics,
  deployed on GCP free tier. This is what unlocks Lyceum/KONUX/N26 conversations.
- `distributed-storage-system`: run `LargeScaleTest`, record ops/sec +
  behavior under 1-node crash; add the 5-line table to its README.

## Rules

- One matrix/dataset, one command, one CSV. If it isn't in a script, it
  didn't happen.
- Never paste a % without its baseline in the same line.
- Update order: repo README first, CV second, site config third (mirror rule).
