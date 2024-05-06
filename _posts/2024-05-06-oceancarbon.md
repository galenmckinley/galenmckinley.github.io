---
title: Ocean carbon data products, code, papers
category: group news
excerpt: Check out new ocean carbon resources
feature_text: <h1 style="color:Black"> </h1>
image: http://galenmckinley.github.io/assets/img/HPDMaps.png
tags: 
comments: true
---

In the past several years, the McKinley group has developed two machine learning methods to interpolate sparse surface ocean fCO2 data from [SOCAT](https://socat.info) to global coverage. 

- For fCO2-Residual (monthly 1982-2022), we set aside the temperature component of pCO2 prior to machine learning so that we can focus the statistics on the more poorly constrained biological / physical component ([Bennington et al. 2022, JAMES](https://agupubs.onlinelibrary.wiley.com/doi/abs/10.1029/2021MS002960)).
	
- In LDEO-HPD (monthly 1959-2022), we use hindcast ocean models as a prior, and use machine learning to correct them toward the data ([Gloege et al. 2022 JAMES](https://agupubs.onlinelibrary.wiley.com/doi/epdf/10.1029/2021MS002620), and [Bennington et al. 2022, GRL](https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2022GL098632)).

In collaboration with colleagues at NOAA, we have also developed a final version of the Takahashi monthly fCO2 and net air-sea CO2 flux climatology [Fay et al. 2024](https://essd.copernicus.org/articles/16/2123/2024/).

To make these results easily available, we are launching a [new website](https://oceancarbon.ldeo.columbia.edu) that describes these three data products in detail, and provides links for download of both the finished data products and the code used to create them. This site will be updated annually. 

Please check it out and bookmark it for future reference!
	
	