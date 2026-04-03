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
/* Hide scrollbar for Chrome, Safari and Opera */
html::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
html {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.cv-frame-wrap {
  width: 100%;
  height: 100vh;
}

#cvframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0;
  padding: 0;
}

@supports (height: 100dvh) {
  .cv-frame-wrap {
    height: 100dvh;
  }
}
</style>

<script>
function scrollToCvFrame() {
  var frame = document.getElementById('cvframe');
  if (!frame) return;

  // Jump to the iframe so the header/menu area is skipped initially.
  frame.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'auto' });
}

document.addEventListener('DOMContentLoaded', function () {
  requestAnimationFrame(scrollToCvFrame);
  setTimeout(scrollToCvFrame, 120);
});

window.addEventListener('pageshow', function () {
  setTimeout(scrollToCvFrame, 60);
});
</script>