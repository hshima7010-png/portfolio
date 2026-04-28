// =============================================
// View Transitions API によるページ遷移
// portfolio.html の <script> 末尾に追加してください
// =============================================
(function () {
  if (!document.startViewTransition) return;

  function isPageLink(href) {
    if (!href) return false;
    if (href.startsWith('#')) return false;
    if (href.startsWith('tel:')) return false;
    if (href.startsWith('mailto:')) return false;
    if (href.startsWith('http') && !href.includes(location.hostname)) return false;
    return href.includes('index.html') || href.includes('portfolio.html');
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!isPageLink(href)) return;

    e.preventDefault();

    document.startViewTransition(function () {
      window.location.href = href;
    });
  });
})();