---
layout: post
title: "Notes: 'A Pixel Is Not A Little Square' (Alvy Ray Smith)"
date: 2026-09-28
description: a summary of Alvy Ray Smith's 1995 memo on why pixels (and voxels) are point samples, not little squares (or cubes)
tags: reading graphics
categories:
featured: false
---

Notes on Alvy Ray Smith's 1995 Microsoft Technical Memo 6, *["A Pixel Is Not A Little Square, A Pixel Is Not A Little Square, A Pixel Is Not A Little Square! (And a Voxel is Not a Little Cube)"](http://alvyray.com/Memos/CG/Microsoft/6_pixel.pdf)*.

**The argument.** The common intuition that a pixel is a small colored square — something you could zoom into and see as a tile — is wrong, and it produces real bugs in graphics code. Smith repeats the title three times to make sure it sticks.

**What a pixel actually is.** Following classical sampling theory (Nyquist–Shannon), treat an image as a continuous 2D signal. A pixel is a *point sample* of that signal: an infinitesimal measurement at one location, not an area filled with color. The "little square" only shows up when you apply a *reconstruction filter* to turn discrete samples back into a continuous image for display — and a box (square) filter happens to be one of the worst filters you could pick for that job.

**Why the square model persists.** Physical hardware reinforces it: CRT phosphor dots, LCD cells, and print dots all have a real footprint, so each pixel *looks* like it owns a patch of area. But that's an artifact of the display device, not a property of the sample itself.

**Where it breaks things:**
- **Rotation and scaling** — treating an image as tiled squares and moving/rescaling the tiles leaves gaps and overlaps. The correct approach reconstructs the continuous signal (ideally with something sinc-like) and resamples it at the new points.
- **Antialiasing** — box-filter supersampling (averaging over little square areas) is a weak low-pass filter with poor frequency response. Better reconstruction filters (Gaussian, Mitchell–Netravali, windowed sinc) avoid the resulting artifacts.
- **Magnification** — the blockiness of nearest-neighbor scaling *is* the little-square fallacy, made visible.

**The voxel extension.** The same mistake recurs one dimension up. A voxel is not a little cube of material — it's a point sample of a 3D scalar field (e.g., density in a CT scan or a volumetric simulation). Treating voxels as literal cubes produces blocky, physically wrong volume renderings; treating them as samples and applying proper 3D reconstruction filters gives smooth, accurate results instead.

**Takeaway.** Correct mental models grounded in signal-processing theory — sampling, reconstruction, filtering — aren't pedantry. The sloppy "squares and cubes" picture, however tempting to teach, actively misleads practitioners and textbook authors alike.
