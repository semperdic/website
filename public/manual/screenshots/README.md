# Manual screenshots

Real Semper device captures from `semperdic-app/docs/images/`, exported to WebP
(source captures are 460×1022 phone frames).

| File | OM source | Used on |
|---|---|---|
| `home.webp` | `home.png` | Getting started, Exports |
| `step1-frames.webp` | `step1-frames.png` | Analysis · Step 1 |
| `roi-editor.webp` | `roi-editor.png` | Analysis · ROI |
| `result-viewer.webp` | `result-viewer.png` | Sweeps & results · Reading |
| `result-lattice.webp` | `result-lattice.png` | Sweeps & results · Lattice |

Keep filenames stable. After replacing a file, re-export to WebP (quality ~82)
and bump `FIGURE_CACHE` in `src/components/Figure.astro`. `Figure` references use
the `.webp` name and pass intrinsic `width`/`height` to reserve layout space.

## Re-capture owed (app tip ahead of stills)

As of the 2026-08-07 app tip, prose documents UX that these stills do **not**
yet show:

- Lattice: pinned **Save graph · View** bar, scrub slider under the plot,
  Isolate/Highlight, colour-matched nodes, scrollable layout
- Home: **Only in cloud** badge and determinate restore/upload progress on rows

Until fresh device captures replace `result-lattice.webp` / `home.webp`, page
captions call out the gap so readers are not misled by the photo alone.
