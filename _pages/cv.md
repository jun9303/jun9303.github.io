---
layout: splash
permalink: "/cv/"
title: "CV"
---

<iframe src="/assets/pdfjs/web/viewer.html?file=/assets/pdf/cv_sangjoonlee.pdf#page=1&pagemode=none" style="width:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;" id="cvframe">
    Your browser doesn't support iframes
</iframe>

<script src="/assets/js/vendor/jquery/jquery-3.4.0.min.js">
$( window ).load(function () {
  $("#cvframe").css('height', $(window).height()-$(".masthead").outerHeight(true)-$(".page__footer").outerHeight(true));
  $( window ).on( "resize", function() {
    $("#cvframe").css('height', $(window).height()-$(".masthead").outerHeight(true)-$(".page__footer").outerHeight(true));
  } );
} );
</script>

<style>
  .page_footer{
    margin-top: 0;
  }
</style>