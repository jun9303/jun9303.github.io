---
layout: splash
permalink: "/cv/"
title: "CV"
---

<div class="cv-frame-wrap">
  <iframe src="/assets/pdfjs/web/viewer.html?file=/assets/pdf/cv_sangjoonlee.pdf#page=1&pagemode=none" allowfullscreen webkitallowfullscreen id="cvframe">
      Your browser doesn't support iframes
  </iframe>
</div>

<style type="text/css">
.cv-frame-wrap {
  position: sticky;
  top: 0;
  height: 100vh;
}

#cvframe {
  display: block;
  width: 100%;
  height: 100vh;
  border: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  vertical-align: bottom;
}

@supports (height: 100dvh) {
  .cv-frame-wrap,
  #cvframe {
    height: 100dvh;
  }
}
</style>