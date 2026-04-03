document.addEventListener('DOMContentLoaded', function () {
  var sections = document.querySelectorAll('.publication-category');
  var urlPattern = /https?:\/\/[^\s<>()\[\]"']+/g;
  var doiPattern = /\b10\.\d{4,9}\/[-._;()/:A-Z0-9]+\b/ig;

  function wrapTextNode(node) {
    var text = node.nodeValue;
    if (!text) return;

    urlPattern.lastIndex = 0;
    doiPattern.lastIndex = 0;

    if (!urlPattern.test(text) && !doiPattern.test(text)) return;

    var fragment = document.createDocumentFragment();
    var lastIndex = 0;
    var regex = /https?:\/\/[^\s<>()\[\]"']+|\b10\.\d{4,9}\/[-._;()/:A-Z0-9]+\b/ig;
    var match;

    while ((match = regex.exec(text)) !== null) {
      var value = match[0];
      var start = match.index;

      if (start > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, start)));
      }

      var href = /^10\./i.test(value) ? ('https://doi.org/' + value) : value;
      var link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = href;
      fragment.appendChild(link);

      lastIndex = start + value.length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode.replaceChild(fragment, node);
  }

  function walk(node) {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      wrapTextNode(node);
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.tagName === 'A' || node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

    Array.from(node.childNodes).forEach(walk);
  }

  function paginateSection(section) {
    var pageSize = parseInt(section.getAttribute('data-page-size') || '10', 10);
    var list = section.querySelector('ol.bibliography');
    if (!list) return;

    var items = Array.from(list.children).filter(function (child) {
      return child.tagName === 'LI';
    });

    items.forEach(function (item) {
      walk(item);
    });

    if (items.length <= pageSize) return;

    var totalPages = Math.ceil(items.length / pageSize);
    var currentPage = 1;
    var pager = document.createElement('div');
    pager.className = 'pub-pagination';

    var prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.textContent = 'Prev';

    var pageIndicator = document.createElement('span');
    pageIndicator.className = 'pub-pagination-indicator';

    var nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.textContent = 'Next';

    pager.appendChild(prevButton);
    pager.appendChild(pageIndicator);
    pager.appendChild(nextButton);

    list.insertAdjacentElement('afterend', pager);

    function renderPage(pageNumber) {
      currentPage = pageNumber;
      var start = (pageNumber - 1) * pageSize;
      var end = start + pageSize;

      items.forEach(function (item, index) {
        item.hidden = index < start || index >= end;
      });

      list.start = start + 1;
      pageIndicator.textContent = pageNumber + ' / ' + totalPages;
      prevButton.disabled = pageNumber === 1;
      nextButton.disabled = pageNumber === totalPages;
    }

    function renderWithStableViewport(targetPage) {
      if (targetPage < 1 || targetPage > totalPages || targetPage === currentPage) return;
      var beforeTop = pager.getBoundingClientRect().top;
      renderPage(targetPage);
      var afterTop = pager.getBoundingClientRect().top;
      window.scrollBy(0, afterTop - beforeTop);
    }

    prevButton.addEventListener('click', function () {
      renderWithStableViewport(currentPage - 1);
    });

    nextButton.addEventListener('click', function () {
      renderWithStableViewport(currentPage + 1);
    });

    renderPage(1);
  }

  sections.forEach(paginateSection);
});
