---
layout: splash
permalink: "/publications/"
title: "Publications"
header:
  overlay_image: /assets/images/header_publications.jpg
  overlay_filter: 0.2
  caption: "*Crystal Cove State Beach, CA, United States, 2022*"
---

<link rel="stylesheet" href="/assets/css/publications.css">

<div class="pub-filter" id="pub-filter" hidden>
  <div class="pub-filter__row">
    <span class="pub-filter__title">Year</span>
    <output class="pub-filter__range" id="pub-filter-range" for="pub-year-from pub-year-to"></output>
    <span class="pub-filter__count" id="pub-filter-count" role="status"></span>
    <button type="button" class="pub-filter__reset" id="pub-filter-reset">Reset</button>
  </div>
  <div class="pub-slider" id="pub-slider">
    <div class="pub-slider__track" aria-hidden="true"><div class="pub-slider__fill" id="pub-slider-fill"></div></div>
    <input type="range" class="pub-slider__input" id="pub-year-from" aria-label="Earliest year" step="1">
    <input type="range" class="pub-slider__input" id="pub-year-to" aria-label="Latest year" step="1">
  </div>
  <div class="pub-slider__ends" aria-hidden="true"><span id="pub-year-lo"></span><span id="pub-year-hi"></span></div>
</div>

<p class="pub-empty" id="pub-empty" hidden>No publications in this range.</p>

<section class="pub-section" id="pub-peer-reviewed">
<h2 id="peer-reviewed-articles">Peer-Reviewed Articles</h2>
<p class="pub-legend">* Corresponding | † Co-first</p>
{% bibliography --file _bibliography/peer_reviewed %}
</section>

<section class="pub-section" id="pub-conference">
<h2 id="conference-papers-presentations">Conference Papers &amp; Presentations</h2>
{% bibliography --file _bibliography/conference %}
</section>

<section class="pub-section" id="pub-talks">
<h2 id="invited-talks-seminars">Invited Talks &amp; Seminars</h2>
{% bibliography --file _bibliography/talk %}
</section>

<section class="pub-section" id="pub-software">
<h2 id="software-data">Software &amp; Data</h2>
{% bibliography --file _bibliography/software %}
</section>

<script src="/assets/js/publications-post.js"></script>
