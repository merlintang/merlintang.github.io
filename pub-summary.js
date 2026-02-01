(function() {
  function getTitleText(b) {
    var a = b.querySelector('a');
    return a ? a.textContent.trim() : b.textContent.trim();
  }
  function getTitleHref(b) {
    var a = b.querySelector('a');
    return a ? a.getAttribute('href') : null;
  }

  function showModal(title, summary, href) {
    var overlay = document.createElement('div');
    overlay.className = 'pub-summary-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'pub-summary-title');

    var box = document.createElement('div');
    box.className = 'pub-summary-box';

    var titleEl = document.createElement('h4');
    titleEl.id = 'pub-summary-title';
    titleEl.className = 'pub-summary-title';
    titleEl.textContent = title;

    var summaryEl = document.createElement('p');
    summaryEl.className = 'pub-summary-text';
    summaryEl.textContent = summary;

    var actions = document.createElement('div');
    actions.className = 'pub-summary-actions';
    if (href) {
      var readBtn = document.createElement('a');
      readBtn.href = href;
      readBtn.target = '_blank';
      readBtn.rel = 'noopener';
      readBtn.className = 'pub-summary-btn pub-summary-btn-primary';
      readBtn.textContent = 'Read paper \u2192';
      actions.appendChild(readBtn);
    }
    var closeBtnEl = document.createElement('button');
    closeBtnEl.type = 'button';
    closeBtnEl.className = 'pub-summary-btn pub-summary-btn-close';
    closeBtnEl.textContent = 'Close';
    closeBtnEl.setAttribute('aria-label', 'Close');

    function closeModal() {
      overlay.removeEventListener('click', onOverlayClick);
      closeBtnEl.removeEventListener('click', onCloseClick);
      document.removeEventListener('keydown', onEscape);
      overlay.classList.remove('pub-summary-visible');
      setTimeout(function() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 200);
    }

    function onOverlayClick(e) {
      if (e.target === overlay) closeModal();
    }
    function onCloseClick() { closeModal(); }
    function onEscape(e) {
      if (e.key === 'Escape') closeModal();
    }

    closeBtnEl.addEventListener('click', onCloseClick);
    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onEscape);

    box.appendChild(titleEl);
    box.appendChild(summaryEl);
    box.appendChild(actions);
    actions.appendChild(closeBtnEl);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    requestAnimationFrame(function() {
      overlay.classList.add('pub-summary-visible');
    });
  }

  function initPubSummary() {
    var pubSection = document.getElementById('pub');
    if (!pubSection) return;

    pubSection.addEventListener('click', function(e) {
      var li = e.target.closest('ul > li[data-pub-summary]');
      if (!li) return;
      var b = li.querySelector(':scope > b');
      if (!b || !b.contains(e.target)) return;

      e.preventDefault();
      var title = getTitleText(b);
      var summary = li.getAttribute('data-pub-summary');
      var href = getTitleHref(b);
      if (summary) showModal(title, summary, href);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPubSummary);
  } else {
    initPubSummary();
  }
})();
