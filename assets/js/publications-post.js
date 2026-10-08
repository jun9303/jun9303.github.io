(function () {
  function linkifyTextNode(textNode) {
    var text = textNode.nodeValue;
    var parent = textNode.parentNode;
    var fragment = document.createDocumentFragment();
    var pattern = /(https?:\/\/[^\s<>"]+)|(\b10\.\d{4,9}\/[\-._;()\/:A-Z0-9]+\b)|(\barXiv:\d{4}\.\d{4,5}(?:v\d+)?\b)/gi;
    var lastIndex = 0;
    var match;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      var raw = match[0];
      var href;
      if (/^https?:\/\//i.test(raw)) {
        href = raw;
      } else if (match[3]) {
        href = "https://arxiv.org/abs/" + raw.slice(6);
      } else {
        href = "https://doi.org/" + raw;
      }
      var a = document.createElement("a");
      a.href = href;
      a.textContent = raw;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      fragment.appendChild(a);

      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    if (fragment.childNodes.length > 0) {
      parent.replaceChild(fragment, textNode);
    }
  }

  function highlightLeeName(container) {
    // Apply bold + underline to Lee, S. style names rendered by bibliography style output.
    container.innerHTML = container.innerHTML
      .replace(/(Lee,\s*S\.)(\*|†)?/g, "<ins><strong>$1</strong></ins>$2")
      .replace(/(Lee,\s*Sangjoon)(\*|†)?/g, "<ins><strong>$1</strong></ins>$2");
  }

  function postProcessPublications() {
    var listItems = document.querySelectorAll(".bibliography li");
    if (!listItems.length) return;

    listItems.forEach(function (item) {
      highlightLeeName(item);

      var walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT, null, false);
      var textNodes = [];
      var current;

      while ((current = walker.nextNode())) {
        var parentTag = current.parentNode && current.parentNode.nodeName;
        if (!parentTag) continue;
        if (parentTag === "A" || parentTag === "SCRIPT" || parentTag === "STYLE") continue;
        if (!current.nodeValue || !current.nodeValue.trim()) continue;
        textNodes.push(current);
      }

      textNodes.forEach(linkifyTextNode);
    });
  }

  // Year range filter: two native range inputs on one track.
  function initYearFilter() {
    var root = document.getElementById("pub-filter");
    var from = document.getElementById("pub-year-from");
    var to = document.getElementById("pub-year-to");
    if (!root || !from || !to) return;

    var slider = document.getElementById("pub-slider");
    var fill = document.getElementById("pub-slider-fill");
    var rangeOut = document.getElementById("pub-filter-range");
    var countOut = document.getElementById("pub-filter-count");
    var reset = document.getElementById("pub-filter-reset");
    var empty = document.getElementById("pub-empty");
    var loLabel = document.getElementById("pub-year-lo");
    var hiLabel = document.getElementById("pub-year-hi");
    var sections = Array.prototype.slice.call(document.querySelectorAll(".pub-section"));

    var entries = [];
    sections.forEach(function (section) {
      // Fixed list numbers, so each entry keeps its CV number when others are hidden.
      section.querySelectorAll("ol.bibliography").forEach(function (ol) {
        ol.querySelectorAll(":scope > li").forEach(function (li, i) { li.value = i + 1; });
      });
      section.querySelectorAll(".bibliography > li").forEach(function (li) {
        var tag = li.querySelector(".bib-entry[data-year]");
        var year = tag ? parseInt(tag.getAttribute("data-year"), 10) : NaN;
        entries.push({ li: li, year: year });
      });
    });

    var years = entries
      .map(function (e) { return e.year; })
      .filter(function (y) { return isFinite(y); });
    if (years.length === 0) return;

    var lo = Math.min.apply(null, years);
    var hi = Math.max.apply(null, years);
    if (lo === hi) return;

    [from, to].forEach(function (input) {
      input.min = lo;
      input.max = hi;
    });
    from.value = lo;
    to.value = hi;
    if (loLabel) loLabel.textContent = lo;
    if (hiLabel) hiLabel.textContent = hi;

    // When a drag starts with both thumbs on the same year, the dragged thumb may
    // pass the other one. The browser keeps the pointer on one input until the
    // drag ends, so the filter uses the lower and higher value during the drag
    // and endDrag() puts the two values back in order.
    var crossing = false;

    function percent(value) {
      return ((value - lo) / (hi - lo)) * 100;
    }

    function setTop(input) {
      from.classList.toggle("is-top", input === from);
      to.classList.toggle("is-top", input === to);
    }

    function update(changed) {
      var a = parseInt(from.value, 10);
      var b = parseInt(to.value, 10);

      if (a > b && !crossing) {
        if (changed === from) from.value = b;
        else to.value = a;
        a = parseInt(from.value, 10);
        b = parseInt(to.value, 10);
      }
      if (a > b) {
        var t = a;
        a = b;
        b = t;
      }

      if (a === b) {
        // Keep the thumb that can still move on top.
        if (b === hi) setTop(from);
        else if (a === lo) setTop(to);
      }

      var shown = 0;
      entries.forEach(function (e) {
        var visible = !isFinite(e.year) || (e.year >= a && e.year <= b);
        e.li.classList.toggle("is-hidden", !visible);
        if (visible) shown += 1;
      });

      sections.forEach(function (section) {
        var any = section.querySelector(".bibliography > li:not(.is-hidden)");
        section.classList.toggle("is-hidden", !any);
      });

      fill.style.left = percent(a) + "%";
      fill.style.right = 100 - percent(b) + "%";
      rangeOut.textContent = a + " – " + b;
      from.setAttribute("aria-valuetext", "From " + a);
      to.setAttribute("aria-valuetext", "To " + b);
      countOut.textContent = "Showing " + shown + " of " + entries.length;
      empty.hidden = shown !== 0;
    }

    from.addEventListener("input", function () { update(from); });
    to.addEventListener("input", function () { update(to); });

    [from, to].forEach(function (input) {
      input.addEventListener("pointerdown", function () {
        crossing = from.value === to.value;
        setTop(input);
      });
      input.addEventListener("focus", function () { setTop(input); });
      input.addEventListener("change", endDrag);
    });

    function endDrag() {
      if (!crossing) return;
      crossing = false;
      var a = parseInt(from.value, 10);
      var b = parseInt(to.value, 10);
      if (a <= b) return;
      var dragged = document.activeElement;
      from.value = b;
      to.value = a;
      // Keep keyboard focus on the thumb the user moved.
      if (dragged === to) from.focus();
      else if (dragged === from) to.focus();
      update(null);
    }
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    // A click or tap on the bare track moves the nearer thumb.
    slider.addEventListener("pointerdown", function (event) {
      if (event.target === from || event.target === to) return;
      // Stop the mousedown default, which would move focus from the thumb to <body>.
      event.preventDefault();
      var track = slider.querySelector(".pub-slider__track").getBoundingClientRect();
      if (track.width <= 0) return;
      var ratio = Math.min(1, Math.max(0, (event.clientX - track.left) / track.width));
      var value = Math.round(lo + ratio * (hi - lo));
      var a = parseInt(from.value, 10);
      var b = parseInt(to.value, 10);
      var target = Math.abs(value - a) <= Math.abs(value - b) ? from : to;
      if (a === b) target = value < a ? from : to;
      target.value = value;
      setTop(target);
      update(target);
      target.focus();
    });

    reset.addEventListener("click", function () {
      from.value = lo;
      to.value = hi;
      update(null);
    });

    root.hidden = false;
    update(null);
  }

  function init() {
    postProcessPublications();
    initYearFilter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
