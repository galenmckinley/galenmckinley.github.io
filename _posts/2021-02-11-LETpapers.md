---
title: The challenge of getting a new approach through review!
category: 
excerpt: Personal thoughts on the challenges of cross-disciplinary publishing
feature_text: <h1 style="color:White;">  </h1>
image: http://galenmckinley.github.io/assets/img/ocean.jpg
tags: 
comments: true
---

For the past several years, my group has been working to take advantage of both data science and ocean modeling tools to improve quantification of the ocean carbon sink.

One of the efforts that has been particularly well-received in our presentations and discussions with both the data science and earth system modeling community is our Large Ensemble Testbed. This is a collection of 25 members from each of 4 Earth System Model large ensembles that we have curated so that it can be used to test the skill of machine learning reconstructions of surface ocean pCO2. This is also one way that physical understanding can guide the use of ML - a new addition in the area of "Physics Guided ML". 

In [Gloege et al.](https://www.essoar.org/doi/abs/10.1002/essoar.10502036.1), we test the SOM-FFN neural network, and in [Stamell et al.](https://doi.org/10.5194/gmd-2020-311), we test relatively standard NN, XGB and RF approaches so that we can quantify the different  strengths and weaknesses in extrapolation. 

But getting the work published has been so difficult! Our reviewers either argue that the Earth System Models are not representative enough of the real world for this application, or they think we are trying to reconstruct actual pCO2 using model output. They want us to throw out the Earth System Models that do not give as much decadal variability as suggested by the very ML method that we are trying to test, or they tell us that uncertainty in extrapolation is not interesting enough to explore at all.

So, we end up spending years trying to get this work published. Meantime, in data science, people post their paper to an archive and it is then considered "published". This is such a huge contrast! What is the right middle ground?  For now, it seems at minimum fair for me to post [Stamell et al.](https://doi.org/10.5194/gmd-2020-311) - just rejected from Geoscientific Model Development - as a [published paper](https://galenmckinley.github.io/publications/) (in GMD Discussions). 

How else are we going to evaluate the uncertainty in extrapolation from less than 2% coverage pCO2 data to the global ocean if we do not use the physical information encoded in Earth System Models? How else are we going to know if 2% coverage pCO2 data can constrain the ocean carbon sink?  Please contact me if you have thoughts on other approaches. 


