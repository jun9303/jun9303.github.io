---
layout: splash
permalink: "/publications/"
title: "Publications"
header:
  overlay_image: /assets/images/header_publications.jpg
  overlay_filter: 0.2
  caption: "*Crystal Cove Beach, Irvine, CA (2022)* &nbsp; **[View Full-image](/assets/photographs/reef_point_crystal_cove_2022.jpg)**"
---

<h1>PEER-REVIEWED ARTICLES</h1>

\* Corresponding / † Co-first

<section class="publication-category" data-page-size="10">
{% bibliography --query @*[keywords=peer_reviewed] %}
</section>

<h1>CONFERENCE PAPERS/PRESENTATIONS</h1>

<section class="publication-category" data-page-size="10">
{% bibliography --query @*[keywords=conference] %}
</section>

<h1>INVITED TALKS/SEMINARS</h1>

<section class="publication-category" data-page-size="10">
{% bibliography --query @*[keywords=talk] %}
</section>

<h1>SOFTWARE/CODES</h1>

<section class="publication-category" data-page-size="10">
{% bibliography --query @*[keywords=software] %}
</section>

<script src="{{ '/assets/js/publications.js' | relative_url }}"></script>

<style type="text/css">
h1 {
  margin-top: 2em;
}
h3 {
  margin-top: 0.5em;
}

.publication-category {
  margin-bottom: 2rem;
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

.pub-pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pub-pagination button {
  border: 1px solid #c7c7c7;
  background: #fff;
  border-radius: 4px;
  padding: 0.35rem 0.7rem;
  cursor: pointer;
}

.pub-pagination-indicator {
  min-width: 3.5rem;
  text-align: center;
  font-size: 0.9rem;
}

.pub-pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>