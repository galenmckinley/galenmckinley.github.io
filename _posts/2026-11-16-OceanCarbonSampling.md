---
title: Exploring surface ocean CO<sub>2</sub> data 
category: research
excerpt: New visualization of surface ocean CO<sub>2</sub> sampling
feature_text: <h1 style="color:White"> Visualizing surface ocean CO<sub>2</sub> data </h1>
image: http://galenmckinley.github.io/assets/img/ocean.jpg
tags: 
comments: true
---

The McKinley group and our collaborators in SOCOM use machine learning to turn sparse ship-based measurements of surface ocean CO<sub>2</sub> from [SOCAT](https://socat.info) into complete global maps. These maps are key to quantify the ocean carbon sink in the Global Carbon Budget and how we study its [mechanisms](https://galenmckinley.github.io/publications/). 

But how sparse are those measurements, really?

[Bokai He](https://bokaihe.github.io/ocean-carbon-sampling/), a former student in my Spring 2025 EESC/STAT 4243 class, built this globe as part of an independent extension of his class project. Each dot is a 1° grid cell with real surface-water fCO<sub>2</sub> measurements from [SOCAT v2025](https://doi.org/10.25921/648f-fv35). Drag to rotate, pick a year or month, and tap a dot to read its value. The gaps are the story: in 2005, only about 2% of monthly 1° ocean grid cells had a ship measurement; by 2014, sampling improved, but was still only about 3%. 

<link rel="stylesheet" href="/assets/ocean-carbon-sampling/socat-globe.css">
<div class="ocs-globe-card" id="observation-explorer">
<div class="ocs-globe-stage">
<canvas id="observation-globe" tabindex="0" role="img" aria-label="Globe of SOCAT observed surface fCO2. Drag or use arrow keys to rotate; plus and minus zoom."></canvas>
<p class="ocs-globe-hint">Drag to rotate · pinch or Ctrl + scroll to zoom</p>
</div>
<div class="ocs-globe-panel">
<div><p class="ocs-label">Year</p><div class="ocs-seg" id="observation-year" role="group" aria-label="Year"></div></div>
<div><p class="ocs-label">Month</p><div class="ocs-months" id="observation-month" role="group" aria-label="Month"></div></div>
<div><p class="ocs-label">Surface-water fCO₂ · µatm</p><div class="ocs-ramp" id="observation-scale"></div><div class="ocs-ticks"><span>≤200</span><span>400</span><span>≥600</span></div><div class="ocs-key"><span><i class="k-land"></i>Land</span><span><i class="k-none"></i>No observation</span></div></div>
<p class="ocs-readout big" id="observation-count">Loading…</p>
<p class="ocs-readout" id="observation-readout" aria-live="polite"></p>
</div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script>
<script src="/assets/ocean-carbon-sampling/socat-globe.js"></script>

Unfortunately, the sampling gains illustrated here from 2005 to 2010 to 2014 have reversed in recent years. Sampling coverage in the last 5 years (2020-2024) has fallen to only about 2% ([Dong et al. 2024](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2024GL108502)). The McKinley group is collaborating on a new project that will fill some of the most glaring gaps in observations which are found in the Southern Ocean in austral winter (June-July-August). With the [Constraining Ocean Carbon with Optimized Observing (COCO2)](https://coco2-vicc.github.io) project, we are using uncrewed surface vehicles (USVs) from Saildrone to go to the dangerous waters of the wintertime Southern Ocean to get these essential data. 

Bokai's [full data story](https://bokaihe.github.io/ocean-carbon-sampling/) goes further. Using an Earth system model as a known "truth," he asks whether *where* we sample changes how well machine learning can reconstruct the full field. With the same 5,000 samples, allocating them according to historical ship density produced about 27% higher mean absolute error than sampling at random. Adding observations to the real network helps substantially; aiming them at historical gaps helps a little more. This builds on testbed work from our group, including [Gloege et al. (2021)](https://doi.org/10.1029/2020GB006788) and [Heimdal et al. (2024)](https://doi.org/10.5194/bg-21-2159-2024). Code and data are on [GitHub](https://github.com/BokaiHe/ocean-carbon-sampling).

Congratulations, Bokai, on a beautiful piece of work!

*Globe and data processing by Bokai He. We thank the SOCAT data providers, researchers, funding agencies, data managers and quality controllers. SOCAT is an international effort endorsed by IOCCP and SOLAS.*

 -- Galen A. McKinley, November 16, 2026
