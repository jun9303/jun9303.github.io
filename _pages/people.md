---
layout: splash
permalink: "/people/"
title: "People"
header:
  overlay_image: /assets/images/header_people.jpg
  overlay_filter: 0.2
  caption: "*Grand Canyon, AZ, United States, 2017*"
---

<link rel="stylesheet" href="{{ '/assets/css/people.css' | relative_url }}?v={{ site.time | date: '%s' }}">

<div class="people">
<p class="people-notice">Our lab starts in November 2026 and is recruiting now. See <a href="{{ '/contact_us/#join-us' | relative_url }}">Available Positions</a>.</p>

{% include people-grid.html %}
</div>

<div class="people">
{% include alumni-table.html %}
{% include genealogy.html %}
</div>

<script defer src="{{ '/assets/js/people.js' | relative_url }}?v={{ site.time | date: '%s' }}" data-moved-to="{{ '/contact_us/#join-us' | relative_url }}"></script>
