(function() {
  function initPubAuthors() {
    var pubSection = document.getElementById('pub');
    if (!pubSection) return;

    var items = pubSection.querySelectorAll('ul > li');
    items.forEach(function(li) {
      var brs = li.querySelectorAll('br');
      if (brs.length < 2) return;

      var firstBr = brs[0];
      var nodes = [];
      var n = firstBr.nextSibling;
      while (n) {
        if (n.tagName === 'BR') break;
        nodes.push(n);
        n = n.nextSibling;
      }
      if (nodes.length === 0) return;

      var wrap = document.createElement('div');
      wrap.className = 'pub-authors collapsed';
      var inner = document.createElement('span');
      inner.className = 'pub-authors-text';
      nodes.forEach(function(node) { inner.appendChild(node); });

      wrap.appendChild(inner);
      firstBr.parentNode.insertBefore(wrap, firstBr.nextSibling);

      // Only add toggle if content overflows (needs truncation)
      if (inner.scrollHeight > inner.clientHeight) {
        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'pub-authors-toggle';
        toggle.textContent = ' Expand';
        toggle.setAttribute('aria-label', 'Expand author list');
        wrap.appendChild(toggle);

        toggle.addEventListener('click', function(e) {
          e.stopPropagation();
          wrap.classList.toggle('collapsed');
          wrap.classList.toggle('expanded');
          toggle.textContent = wrap.classList.contains('expanded') ? ' Collapse' : ' Expand';
        });
      } else {
        wrap.classList.remove('collapsed');
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPubAuthors);
  } else {
    initPubAuthors();
  }
})();
