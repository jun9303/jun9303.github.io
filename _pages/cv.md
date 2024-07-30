---
layout: splash
permalink: "/cv/"
title: "CV"
---

<iframe src="/assets/pdfjs/web/viewer.html?file=/assets/pdf/cv_sangjoonlee.pdf#page=1&pagemode=none" style="width:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;" id="cvframe">
    Your browser doesn't support iframes
</iframe>

<script src="/assets/js/vendor/jquery/jquery-3.4.0.min.js" defer>
$("#cvframe").css('height', $(window).height()-$(".masthead")[0].clientHeight-$(".page__footer")[0].clientHeight);
$( window ).on( "resize", function() {
  $("#cvframe").css('height', $(window).height()-$(".masthead")[0].clientHeight-$(".page__footer")[0].clientHeight);
} );
</script>