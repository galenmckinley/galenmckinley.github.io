---
title: Ocean carbon data products, code, papers
category: group news
excerpt: Check out new ocean carbon resources
feature_text: <h1 style="color:Yellow"> Ocean carbon resources </h1>
image: http://galenmckinley.github.io/assets/img/HPDMaps.png
tags: 
comments: true
---

In the past several years, the McKinley group has developed two machine learning methods to interpolate sparse surface ocean fCO2 data from [SOCAT](https://socat.info) to global coverage. 
	
- fCO2-Residual (available 1982-2022) a target variable manipulation that increases reconstruction skill. We set aside the temperature component of pCO2 prior to machine learning so that we can focus the statistics on the more poorly constrained biological / phyiscal component ([Bennington et al. 2022, JAMES](https://agupubs.onlinelibrary.wiley.com/doi/abs/10.1029/2021MS002960)).
	
- LDEO-HPD (available 1959-2022) uses hindcast ocean models as a prior, correcting them toward the data ([Gloege et al. 2022 JAMES](https://agupubs.onlinelibrary.wiley.com/doi/epdf/10.1029/2021MS002620)). Since the climatologial correction dominates correction field, it can be used to correct models prior to 1982 when fCO2 data are too sparse for direct reconstruction ([Bennington et al. 2022, GRL](https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2022GL098632)).

This month, we are launching a [new website](https://oceancarbon.ldeo.columbia.edu) that describes these products, and the provides links for data download and the underlying sourcecode. 
