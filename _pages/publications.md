---
layout: splash
permalink: "/publications/"
title: "Publications"
header:
  overlay_image: /assets/images/header_publications.jpg
  overlay_filter: 0.2
  caption: "*Crystal Cove Beach, Irvine, CA (2022)* &nbsp; **[View Full-image](/assets/photographs/reef_point_crystal_cove_2022.jpg)**"
---

# PEER-REVIEWED ARTICLES

\* Corresponding / † Co-first

Below is the bibliography generated with jekyll-scholar. Add your `.bib` entries to `_bibliography/references.bib`.

{% bibliography %}

# CONFERENCE PAPERS/PRESENTATIONS

1. <ins>**Lee, S.**</ins>, & Marcus, P. S. (2021, Nov 21-23). *Linear Instability Analysis of Wake Vortices by a Spectral Method using Mapped Legendre Functions*. 74th Annual Meeting of the APS Division of Fluid Dynamics, Phoenix, AZ, United States (no. E24.1). American Physical Society. [:link:](https://meetings.aps.org/Meeting/DFD21/Session/E24.1)
1. Wang, J., <ins>**Lee, S.**</ins>, & Marcus, P. S. (2021, Nov 21-23). *Destabilizing Neutrally Stable Wake Vortices Using Degenerate Eigenmodes*. 74th Annual Meeting of the APS Division of Fluid Dynamics, Phoenix, AZ, United States (no. E24.3). American Physical Society. [:link:](https://meetings.aps.org/Meeting/DFD21/Session/E24.3)
1. <ins>**Lee, S.**</ins>, & Hwang, W. (2018, Jul 4-6). *Validation of a Conjugate Heat Transfer Code with Subgrid-scale Models for Turbulent Flow*. KSFM 2018 Summer Conference, Jeju, South Korea (pp. 197-198). Korean Society for Fluid Machinery. [:link:](http://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE07536688&language=ko_KR)
1. Baek, S., <ins>**Lee, S.**</ins>, Hwang, W., & PARK, J. S. (2018, Jun 11-15). *Experimental and Numerical Investigation of the Flow in a Trailing Edge Ribbed Internal Cooling Passage*. ASME 2018 Turbo Expo: Turbomachinery Technical Conference and Exposition, Lillestrøm, Norway (no. GT2018-76741). American Society of Mechanical Engineers. [https://doi.org/10.1115/GT2018-76741](https://doi.org/10.1115/GT2018-76741). *[Journal-Quality Appraisal and Transferred to J. Turbomach]*
1. <ins>**Lee, S.**</ins> (2017, Nov 1-3). *2D Simulation of an Unsteady Flow around a Small Vertical Axis Wind Turbine Using an Immersed Boundary Method*. KSME 2017 Annual Conference, Jeju, South Korea (pp. 741-745). Korean Society of Mechanical Engineers. *Student Paper Award: Bronze Prize in the 9th National Fluid Engineering Contest for Undergraduates*. [:link:](http://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE07287580&language=ko_KR#)
1. Baek, S., <ins>**Lee, S.**</ins>, & Hwang, W. (2017, Nov 1-3). *Investigation of Fully Developed Turbulent Pipe Flow Using Magnetic Resonance Velocimetry (MRV) and Large Eddy Simulation (LES)*. KSME 2017 Annual Conference, Jeju, South Korea (pp. 581-583). Korean Society of Mechanical Engineers. [:link:](http://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE07287540&language=ko_KR#)

# INVITED TALKS/SEMINARS

1. <ins>**Lee, S.**</ins> (2026, Feb 5). *Training-Free Design Generation Through Morphing and Its Applications in Fluid Dynamics*. MAE 297 Seminar Series. Department of Mechanical and Aerospace Engineering, University of California, Davis. *[Davis, CA, United States]*
1. <ins>**Lee, S.**</ins> (2025, Aug 19). *Topology Optimization of Complex Nonlinear Systems Using High-Performance Simulations and Data-Driven Approaches*. GTR Technical Research Society Seminar. Global Technology Research, Samsung Electronics. *[Suwon, South Korea]*
1. <ins>**Lee, S.**</ins> (2025, Jan 10). *Unmasking Hidden Physics and Bridging Data Sparsity: Two Paths to Tackling Fluid Problems*. CTR Tea Seminar. Center for Turbulence Research, Stanford University. *[Stanford, CA, United States]*
1. <ins>**Lee, S.**</ins> (2024, Sep 10). *Physics-Based Computation in the Modern Era of Data-Driven Fluid Mechanics*. SNU Mechanical Engineering Seminar. Department of Mechanical Engineering, Seoul National University. *[Seoul, South Korea]*
1. <ins>**Lee, S.**</ins> (2023, Aug 8). *Design-by-Morphing (DbM): A Novel Design Methodology for Aerodynamic Optimization*. Hyundai Vision Conference 2023. Hyundai Motor Company. *[Seoul, South Korea]*
1. <ins>**Lee, S.**</ins> (2022, Nov 16). *Modern Applications of Computational Fluid Dynamics (CFD)*. 2022 Online Special Lecture Series: Research Reinforcement for Sustainable Buildings and Urban Systems in Future. Department of Architectural and Urban Systems Engineering, Ewha Womans University. *[Online]*
1. <ins>**Lee, S.**</ins> (2018, Aug 8). *An Introduction to In-House LES - Applications to Turbine Internal Cooling and Recent Improvements for Conjugate Heat Transfer Analysis*. KARI Computational Fluid Dynamics Seminar. Korea Aerospace Research Institute. *[Daejeon, South Korea]*

# SOFTWARE/CODES
1. <ins>**Lee, S.**</ins>, Wang, J. (2025). MLegS: Modernized and Parallelized Mapped Legendre Spectral Method Code (Version 1.0.2). [https://github.com/ucbCFD/MLegS](https://github.com/ucbCFD/MLegS).
1. <ins>**Lee, S.**</ins> (2025). roughSurfaceGen: Artificial Rough Surface Generator that Fits Prescribed Surface Roughness Parameters (Version 1.0.1). [https://github.com/jun9303/roughSurfaceGen](https://github.com/jun9303/roughSurfaceGen). 

<style type="text/css">
h1 {
  margin-top: 2em;
}
h3 {
  margin-top: 0.5em;
}

/* Style bibliography entries */
.bibliography {
  list-style-type: decimal;
  padding-left: 20px;
}

.bibliography li {
  margin-bottom: 1em;
  line-height: 1.6;
}

/* Style links only if the bibliography renderer outputs them */
.bibliography a,
.bibliography a:visited {
  color: #0066cc;
  text-decoration: none;
  word-break: break-all;
}

.bibliography a:hover {
  text-decoration: underline;
  color: #0052a3;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function () {
  var bibliography = document.querySelector('.bibliography');
  if (!bibliography) return;

  var urlPattern = /https?:\/\/[^\s<>()\[\]"']+/g;

  function linkifyTextNode(node) {
    var text = node.nodeValue;
    if (!text || !urlPattern.test(text)) return;

    urlPattern.lastIndex = 0;
    var fragment = document.createDocumentFragment();
    var lastIndex = 0;
    var match;

    while ((match = urlPattern.exec(text)) !== null) {
      var url = match[0];
      var start = match.index;

      if (start > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, start)));
      }

      var link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = url;
      fragment.appendChild(link);

      lastIndex = start + url.length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode.replaceChild(fragment, node);
  }

  function walk(node) {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      linkifyTextNode(node);
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.tagName === 'A' || node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

    Array.from(node.childNodes).forEach(walk);
  }

  Array.from(bibliography.querySelectorAll('li')).forEach(walk);
});
</script>