(function () {
  function linkifyTextNode(textNode) {
    var text = textNode.nodeValue;
    var parent = textNode.parentNode;
    var fragment = document.createDocumentFragment();
    var pattern = /(https?:\/\/[^\s<>"]+)|(\b10\.\d{4,9}\/[\-._;()\/:A-Z0-9]+\b)/gi;
    var lastIndex = 0;
    var match;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      var raw = match[0];
      var href = /^https?:\/\//i.test(raw) ? raw : "https://doi.org/" + raw;
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
      .replace(/(Lee,\s*S\.)(\*|\u2020)?/g, "<ins><strong>$1</strong></ins>$2")
      .replace(/(Lee,\s*Sangjoon)(\*|\u2020)?/g, "<ins><strong>$1</strong></ins>$2");
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", postProcessPublications);
  } else {
    postProcessPublications();
  }
})();
