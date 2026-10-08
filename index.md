---
layout: splash
title: "Predictive Fluid and Aeroscience Lab"
excerpt: "School of Mechanical and Aerospace Engineering, NTU Singapore"
description: "Predictive Fluid and Aeroscience Lab, School of Mechanical and Aerospace Engineering, Nanyang Technological University, Singapore."
header:
  overlay_image: /assets/images/header.jpg
  overlay_filter: 0.2

# Home page text. Edit here; the markup below uses these keys.
welcome: >
  The Predictive Fluid and Aeroscience Lab is part of the NTU School of
  Mechanical and Aerospace Engineering (MAE), Singapore. We study fluid flows
  with simulation and data. We use what we learn to improve aerospace design
  and other engineering systems.
vision_title: "Vision"
vision: >
  Aerospace design optimization needs many predictions of complex flow, yet
  a single high-fidelity CFD run can take days of computation. To remove this
  bottleneck, the lab combines three pillars: high-performance computing,
  computational fluid dynamics, and machine intelligence. Simulations on
  parallel computers produce detailed flow data. Machine intelligence learns
  from that data and automates CFD workflows. We aim to build lean, fast
  predictive aerophysics models that cut lead time in aerospace design, from
  heat exchangers and HVAC to engines, propulsion systems, and
  next-generation aircraft such as eVTOL.
pillars:
  - label: "High-Performance Computing"
    line: "Parallel solvers and GPU-accelerated stability analysis for large flow problems."
  - label: "Computational Fluid Dynamics"
    line: "High-fidelity LES, DNS, and spectral methods for turbulence, heat transfer, and flow instability."
  - label: "Machine Intelligence"
    line: "Data-driven surrogates, Bayesian optimization, and autonomous agents for human-on-the-loop CFD."
# "How We Work": two methods in two boxes side by side, then the closing
# sentence centred under them.
methods:
  - term: "Interpolating knowledge"
    text: >
      Fluid motion is nonlinear and often stochastic. With intelligent agents
      and sophisticated AI/ML nonlinear fitting, we search what simulations and
      experiments already cover, and we find the missing links and the optimal
      designs that are still hidden in it.
  - term: "Extrapolating knowledge"
    text: >
      Science also needs discovery. We tackle singularities and resolve them
      with rigorous deduction, to find physics that no data set contains.
      Boundary layers did this for inviscid potential flow theory, and
      continuous viscous critical layers did it for wake vortex stability.
methods_close: >
  Agentic, data-driven predictive aerophysics modeling is the main thrust of
  the lab, and we always pursue it together with new discoveries and theory in
  fluid physics.
# Each card links to /research/#<slug> and shows the figure
# /assets/images/research/<slug>.jpg (the same figure as on the Research page).
research_areas:
  - slug: predictive-aerophysics
    name: "Predictive Aerophysics with Machine Intelligence"
  - slug: design-flow-control
    name: "Data-Driven Aerospace Design and Flow Control"
  - slug: vortex-instability
    name: "Vortex Dynamics and Flow Instability"
  - slug: cfd-computing
    name: "High-Fidelity CFD and Scalable Computing"
  - slug: thermal-fluids
    name: "Thermal-Fluid Systems Across Scales"
news_count: 3
---

<link rel="stylesheet" href="{{ '/assets/css/home.css' | relative_url }}">

<div class="home">

<div class="home-intro">
<section class="home-box home-welcome" aria-labelledby="welcome">
<h2 id="welcome" class="home-box__title">Welcome</h2>
<p class="home-welcome__text">{{ page.welcome | strip }}</p>
<p class="home-actions">
<a href="{{ '/research/' | relative_url }}" class="btn btn--primary btn--large">Our research</a>
<a href="{{ '/contact_us/#join-us' | relative_url }}" class="btn btn--inverse btn--large">Join us</a>
</p>
</section>
<section class="home-box home-vision" aria-labelledby="vision">
<h2 id="vision" class="home-box__title">{{ page.vision_title }}</h2>
<p>{{ page.vision | strip }}</p>
<dl class="home-pillars">
{%- for pillar in page.pillars %}
<dt>{{ pillar.label }}</dt>
<dd>{{ pillar.line }}</dd>
{%- endfor %}
</dl>
</section>
</div>

<section class="home-section home-methods" aria-labelledby="how-we-work">
<h2 id="how-we-work" class="home-heading">How We Work</h2>
<div class="home-methods__pair">
{%- for method in page.methods %}
<div class="home-box home-method">
<h3 class="home-box__title">{{ method.term }}</h3>
<p>{{ method.text | strip }}</p>
</div>
{%- endfor %}
</div>
<p class="home-methods__close">{{ page.methods_close | strip }}</p>
</section>

<section class="home-section home-areas" aria-labelledby="research-areas">
<h2 id="research-areas" class="home-heading">Research Areas</h2>
<ul class="home-areas__grid">
{%- for area in page.research_areas %}
<li class="home-areas__item">
<a class="home-area" href="{{ '/research/' | relative_url }}#{{ area.slug }}">
<img class="home-area__img" src="{{ '/assets/images/research/' | append: area.slug | append: '.jpg' | relative_url }}" alt="" loading="lazy" decoding="async">
<span class="home-area__name">{{ area.name }}</span>
</a>
</li>
{%- endfor %}
</ul>
</section>

{%- comment -%}
Latest news: the newest posts (site.posts is newest first), each with the
date, the title and the first 140 characters of the text.
Date text follows date_precision like _includes/news-feed-item.html.
With no posts, the section is not output.
{%- endcomment -%}
{%- assign news_posts = site.posts | where_exp: "p", "p.hidden != true" -%}
{%- assign news_limit = page.news_count | default: 3 -%}
{%- if news_posts.size > 0 %}

<section class="home-section home-news" aria-labelledby="latest-news">
<h2 id="latest-news" class="home-heading">Latest News</h2>
<ul class="home-news__list">
{%- for post in news_posts limit: news_limit -%}
{%- case post.date_precision -%}
{%- when 'year' -%}
{%- assign date_text = post.date | date: "%Y" -%}
{%- assign date_iso = date_text -%}
{%- when 'month' -%}
{%- assign date_text = post.date | date: "%b %Y" -%}
{%- assign date_iso = post.date | date: "%Y-%m" -%}
{%- else -%}
{%- assign date_text = post.date | date: "%b %-d, %Y" -%}
{%- assign date_iso = post.date | date: "%Y-%m-%d" -%}
{%- endcase -%}
{%- assign title_html = post.title | default: "" | replace: '|', '&#124;' | markdownify | remove: "<p>" | remove: "</p>" | strip -%}
{%- if title_html contains "<a " -%}
{%- assign title_html = title_html | strip_html -%}
{%- endif -%}
{%- assign excerpt_text = post.content | strip_html | normalize_whitespace | strip -%}
{%- if excerpt_text.size > 140 -%}
{%- assign excerpt_text = excerpt_text | slice: 0, 141 | split: " " | pop | join: " " -%}
{%- assign last_char = excerpt_text | slice: -1 -%}
{%- if last_char == "," or last_char == ";" or last_char == ":" or last_char == "." -%}
{%- assign cut_len = excerpt_text.size | minus: 1 -%}
{%- assign excerpt_text = excerpt_text | slice: 0, cut_len -%}
{%- endif -%}
{%- assign excerpt_text = excerpt_text | append: "…" -%}
{%- endif %}
<li class="home-news__item">
<time class="home-news__date" datetime="{{ date_iso }}">{{ date_text }}</time>
<div class="home-news__body">
<a class="home-news__title" href="{{ post.url | relative_url }}">{{ title_html }}</a>
<p class="home-news__excerpt">{{ excerpt_text }}</p>
</div>
</li>
{%- endfor %}
</ul>
<p class="home-news__more"><a href="{{ '/news/' | relative_url }}">All news</a></p>
</section>
{%- endif %}

</div>
