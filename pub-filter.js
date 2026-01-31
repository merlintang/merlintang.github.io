(function() {
  var FILTERS = {
    all: { label: 'All', tag: null },
    llm: { label: 'LLM', tag: 'llm' },
    database: { label: 'Database', tag: 'database' },
    bigdata: { label: 'Big Data', tag: 'bigdata' }
  };

  function initPubFilter() {
    var pubSection = document.getElementById('pub');
    if (!pubSection) return;

    var items = pubSection.querySelectorAll('ul > li[data-pub-tags]');
    if (items.length === 0) return;

    var filterBar = document.createElement('div');
    filterBar.className = 'pub-filter-bar';
    filterBar.setAttribute('role', 'tablist');

    var counts = { all: items.length, llm: 0, database: 0, bigdata: 0 };
    items.forEach(function(li) {
      var tags = (li.getAttribute('data-pub-tags') || '').split(/\s+/);
      tags.forEach(function(t) {
        if (counts[t] !== undefined) counts[t]++;
      });
    });

    Object.keys(FILTERS).forEach(function(key) {
      var filter = FILTERS[key];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pub-filter-btn' + (key === 'all' ? ' active' : '');
      btn.setAttribute('data-filter', key);
      btn.setAttribute('role', 'tab');
      btn.textContent = filter.label + ' (' + counts[key] + ')';
      filterBar.appendChild(btn);
    });

    var firstYear = pubSection.querySelector('.pub-year');
    if (firstYear) {
      pubSection.insertBefore(filterBar, firstYear);
    } else {
      pubSection.appendChild(filterBar);
    }

    function updateVisibility(tag) {
      items.forEach(function(li) {
        var ul = li.closest('ul');
        if (!tag) {
          ul.style.display = '';
        } else {
          var tags = (li.getAttribute('data-pub-tags') || '').split(/\s+/);
          ul.style.display = tags.indexOf(tag) >= 0 ? '' : 'none';
        }
      });
      if (!tag) {
        pubSection.querySelectorAll('.pub-year').forEach(function(h) {
          h.style.display = '';
        });
        return;
      }
      var yearHeaders = pubSection.querySelectorAll('.pub-year');
      yearHeaders.forEach(function(h) {
        var next = h.nextElementSibling;
        var hasVisible = false;
        while (next) {
          if (next.classList && next.classList.contains('pub-year')) break;
          if (next.tagName === 'UL' && next.style.display !== 'none') hasVisible = true;
          next = next.nextElementSibling;
        }
        h.style.display = hasVisible ? '' : 'none';
      });
    }

    filterBar.addEventListener('click', function(e) {
      var btn = e.target.closest('.pub-filter-btn');
      if (!btn) return;
      var filter = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('.pub-filter-btn').forEach(function(b) {
        b.classList.toggle('active', b === btn);
      });
      updateVisibility(FILTERS[filter].tag);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPubFilter);
  } else {
    initPubFilter();
  }
})();
