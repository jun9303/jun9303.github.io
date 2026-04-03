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
function smoothScrollTo(targetY, durationMs) {
  var startY = window.pageYOffset;
  var distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  var startTime = null;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    var elapsed = timestamp - startTime;
    var progress = Math.min(elapsed / durationMs, 1);
    var eased = easeInOutQuad(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function scrollToCvFrame() {
  var frame = document.getElementById('cvframe');
  if (!frame) return;

  var y = frame.getBoundingClientRect().top + window.pageYOffset;
  smoothScrollTo(Math.max(0, y), 1000);
}

document.addEventListener('DOMContentLoaded', function () {
  var frame = document.getElementById('cvframe');
  if (!frame) return;

  var hasAnimated = false;

  function triggerOnce() {
    if (hasAnimated) return;
    hasAnimated = true;
    requestAnimationFrame(scrollToCvFrame);
  }

  // Run when the iframe shell is ready (before PDF fully finishes loading).
  frame.addEventListener('load', function () {
    setTimeout(triggerOnce, 120);
  }, { once: true });

  // Fallback in case `load` is delayed or restored from cache.
  setTimeout(triggerOnce, 1200);
});

window.addEventListener('pageshow', function (event) {
  if (!event.persisted) return;
  setTimeout(function () {
    requestAnimationFrame(scrollToCvFrame);
  }, 120);
});
</script>