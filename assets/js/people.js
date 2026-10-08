/* People page: open member profiles in an overlay.
 *
 * Each .person-card links to #person-<slug>. The hidden .person-popup block
 * with that id contains the profile (see _includes/people-grid.html). Magnific
 * Popup (inline type) shows it; Esc, the close button and a click on the
 * backdrop close it. Tab and Shift+Tab stay inside the open overlay.
 *
 * jQuery and Magnific Popup come from /assets/js/main.min.js at the end of
 * <body>. This file is loaded with "defer", so it runs after that script.
 * If they are still missing, init() retries on window "load".
 *
 * markLineEnds() keeps a wrapped grey line ("Joining August 2027 | Open
 * position", "Email | CV | ORCID") from ending a line with a bar.
 *
 * The open positions moved from this page to Contact Us. Old links to
 * /people/#join-us or /people/#available-positions go to the new place
 * (the "data-moved-to" attribute of the script tag in _pages/people.md).
 */
(function () {
  "use strict";

  var MOVED_HASHES = ["#join-us", "#available-positions"];
  var script = document.currentScript;
  var movedTo =
    (script && script.getAttribute("data-moved-to")) || "/contact_us/#join-us";

  // location.replace, so the Back button skips the old address.
  function redirectMovedHash() {
    if (MOVED_HASHES.indexOf(window.location.hash) === -1) return false;
    window.location.replace(movedTo);
    return true;
  }

  if (redirectMovedHash()) return;
  window.addEventListener("hashchange", redirectMovedHash);

  // Lines with a bar between parts: the role lines and the overlay links.
  // When such a line wraps, the last part on each line gets "is-line-end",
  // and people.css hides the bar after it. The function removes all these
  // classes before it reads the positions, so each run gives the same result.
  var BAR_LINES = ".person-card__role, .person-popup__role, .person-popup__links";
  var lineEndsFrame = 0;

  function markLineEnds() {
    var lines = document.querySelectorAll(BAR_LINES);
    var ends = [];
    var i, j, parts, a, b;
    for (i = 0; i < lines.length; i++) {
      parts = lines[i].children;
      for (j = 0; j < parts.length; j++) parts[j].classList.remove("is-line-end");
    }
    for (i = 0; i < lines.length; i++) {
      parts = lines[i].children;
      for (j = 0; j + 1 < parts.length; j++) {
        a = parts[j].getBoundingClientRect();
        b = parts[j + 1].getBoundingClientRect();
        if (!a.height || !b.height) continue; // in a closed overlay
        if (b.top - a.top > a.height / 2) ends.push(parts[j]);
      }
    }
    for (i = 0; i < ends.length; i++) ends[i].classList.add("is-line-end");
  }

  function scheduleLineEnds() {
    if (lineEndsFrame) return;
    lineEndsFrame = window.requestAnimationFrame(function () {
      lineEndsFrame = 0;
      markLineEnds();
    });
  }

  markLineEnds();
  window.addEventListener("resize", scheduleLineEnds);
  window.addEventListener("load", scheduleLineEnds);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleLineEnds);
  }

  var HASH_PREFIX = "#person-";
  var REMOVAL_DELAY = 200; // ms; matches the fade in assets/css/people.css
  var FOCUSABLE =
    'a[href], area[href], button:not([disabled]), input:not([disabled]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var initialized = false;

  // Slugs keep non-ASCII letters (person-josé-müller), and location.hash
  // returns them percent-encoded (#person-jos%C3%A9-m%C3%BCller).
  function decodeHash(hash) {
    try {
      return decodeURIComponent(hash);
    } catch (e) {
      return hash; // malformed escape such as "%E0"
    }
  }

  function currentHash() {
    return decodeHash(window.location.hash);
  }

  function init() {
    var $ = window.jQuery;
    if (initialized || !$ || !$.fn || !$.fn.magnificPopup || !$.magnificPopup) {
      return;
    }
    initialized = true;

    var openId = null;        // id of the popup that is open now
    var pendingTarget = null; // in-page target to scroll to after close
    var pendingOpen = null;   // popup to open after the current one closes

    function replaceHash(hash) {
      if (!window.history || !window.history.replaceState) return;
      var base = window.location.pathname + window.location.search;
      window.history.replaceState(window.history.state, "", hash ? base + hash : base);
    }

    var options = {
      type: "inline",
      midClick: true,
      mainClass: "mfp-fade",
      removalDelay: REMOVAL_DELAY,
      closeBtnInside: true,
      showCloseBtn: true,
      closeOnBgClick: true,
      enableEscapeKey: true,
      focus: ".mfp-close",
      tClose: "Close (Esc)",
      closeMarkup:
        '<button title="%title%" type="button" class="mfp-close" aria-label="Close">&#215;</button>',
      callbacks: {
        open: function () {
          openId = this.content && this.content.attr("id");
          // Magnific appends the close button at the end of the panel. Move it
          // to the start so that Tab moves from it to the links.
          if (this.content) this.content.prepend(this.content.find(".mfp-close"));
          // The panel has a layout only now that it is open.
          markLineEnds();
          // Keep the URL shareable: /people/#person-<slug> opens this profile.
          if (openId && currentHash() !== "#" + openId) {
            replaceHash("#" + encodeURIComponent(openId));
          }
        },
        beforeClose: function () {
          if (openId && currentHash() === "#" + openId) {
            replaceHash("");
          }
          openId = null;
        },
        afterClose: function () {
          if (pendingOpen) {
            // Magnific removes the old popup after removalDelay, so the next
            // one can only open once that has happened.
            var next = pendingOpen;
            pendingOpen = null;
            window.setTimeout(function () {
              showPopup(next);
            }, 0);
            return;
          }
          if (!pendingTarget) return;
          var target = pendingTarget;
          pendingTarget = null;
          target.el.scrollIntoView({ behavior: "smooth", block: "start" });
          replaceHash(target.hash);
        }
      }
    };

    var $cards = $(".person-card");
    if (!$cards.length) return;
    $cards.magnificPopup(options);

    function popupFor(hash) {
      if (!hash) return null;
      var decoded = decodeHash(hash);
      if (decoded.indexOf(HASH_PREFIX) !== 0 || decoded.length <= HASH_PREFIX.length) {
        return null;
      }
      var el = document.getElementById(decoded.slice(1));
      return el && el.classList.contains("person-popup") ? el : null;
    }

    function showPopup(el) {
      $.magnificPopup.open($.extend(true, {}, options, { items: { src: el } }));
    }

    function openPopup(hash) {
      var el = popupFor(hash);
      if (!el) return false;
      var instance = $.magnificPopup.instance;
      if (instance && instance.isOpen) {
        if (openId === el.id) return true;
        pendingOpen = el;
        $.magnificPopup.close();
        return true;
      }
      if (instance && instance.wrap && instance.wrap.hasClass("mfp-removing")) {
        // A popup is still fading out; open this one when it is gone.
        pendingOpen = el;
        return true;
      }
      showPopup(el);
      return true;
    }

    // Open from the URL on load (e.g. a link to /people/#person-sangjoon-lee)
    // and when the hash changes later.
    openPopup(window.location.hash);
    window.addEventListener("hashchange", function () {
      openPopup(window.location.hash);
    });

    // Keep Tab and Shift+Tab inside the open overlay. Magnific pulls focus
    // back only after it is outside the overlay, so without this a key press
    // can move focus to the page or the browser UI.
    document.addEventListener(
      "keydown",
      function (event) {
        if (event.key !== "Tab" || event.altKey || event.ctrlKey || event.metaKey) return;
        var instance = $.magnificPopup.instance;
        if (!instance || !instance.isOpen || !instance.content || !instance.content[0]) return;
        var items = $.grep(instance.content.find(FOCUSABLE).get(), function (el) {
          return el.getClientRects().length > 0;
        });
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        var active = document.activeElement;
        var inside = instance.content[0].contains(active);
        if (!inside || active === (event.shiftKey ? first : last)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      },
      true
    );

    // Other in-page links. Runs in the capture phase so that it acts before
    // the theme's smooth-scroll handler on document.
    document.addEventListener(
      "click",
      function (event) {
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        var link = event.target.closest ? event.target.closest('a[href^="#"]') : null;
        if (!link || link.classList.contains("person-card")) return;

        var hash = link.getAttribute("href");

        // A plain link to #person-<slug> (outside the cards) opens that profile.
        if (popupFor(hash)) {
          event.preventDefault();
          openPopup(hash);
          return;
        }

        // A link to another anchor on this page inside an open profile:
        // close the overlay, then scroll the page to the target.
        if (hash.length > 1 && link.closest(".mfp-content .person-popup")) {
          var target = document.getElementById(decodeHash(hash).slice(1));
          if (!target) return;
          event.preventDefault();
          pendingTarget = { el: target, hash: hash };
          $.magnificPopup.close();
        }
      },
      true
    );
  }

  init();
  if (!initialized) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    }
    window.addEventListener("load", init);
  }
})();

// Alumni table filters. Each row has data-group; the checkboxes choose which
// groups show. Undergraduates start unchecked (set in alumni-table.html).
// people.css also does the filtering with :has(), so it works without this script.
(function () {
  function initAlumniFilter() {
    var filter = document.querySelector(".alumni-filter");
    var table = document.getElementById("alumni-table");
    if (!filter || !table || filter.getAttribute("data-ready")) return;
    filter.setAttribute("data-ready", "1");
    var rows = Array.prototype.slice.call(table.tBodies[0].rows);
    var boxes = Array.prototype.slice.call(filter.querySelectorAll('input[type="checkbox"]'));
    var empty = document.querySelector(".alumni-empty");

    function apply() {
      var on = {};
      boxes.forEach(function (box) { on[box.value] = box.checked; });
      var shown = 0;
      rows.forEach(function (row) {
        var group = row.getAttribute("data-group");
        // A row with an unknown group always shows.
        var show = Object.prototype.hasOwnProperty.call(on, group) ? on[group] : true;
        row.hidden = !show;
        if (show) shown++;
      });
      table.hidden = shown === 0;
      if (empty) empty.hidden = shown > 0;
    }

    boxes.forEach(function (box) { box.addEventListener("change", apply); });
    apply();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAlumniFilter);
  } else {
    initAlumniFilter();
  }
})();
