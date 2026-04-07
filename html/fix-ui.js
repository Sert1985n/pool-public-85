(function () {
  function txt(el) {
    return (el && el.textContent || "").replace(/\s+/g, " ").trim();
  }

  function fixHelp() {
    if (!location.pathname.startsWith('/help')) return;

    // remove EU rows/blocks, keep RU only
    document.querySelectorAll('tr, div').forEach((el) => {
      const t = txt(el);
      if (t === 'EU') {
        const row = el.closest('tr') || el.parentElement;
        if (row) row.remove();
      }
    });

    // if a whole block still contains EU connection rows, hide them
    document.querySelectorAll('*').forEach((el) => {
      const t = txt(el);
      if (t.startsWith('EU ') || t === 'EU') {
        el.style.display = 'none';
      }
    });
  }

  function fixPortBadges() {
    // replace trailing BTC region in worker/port badges with RU
    document.querySelectorAll('td, span, div, small').forEach((el) => {
      const t = txt(el);
      if (/^\d+(\.\d+)?\s*[KMGTP]?\s*BTC$/i.test(t)) {
        el.textContent = t.replace(/\bBTC\b/i, 'RU');
      }
      if (t === 'NaN BTC') {
        el.textContent = '1024 RU';
      }
    });
  }

  function fixNaN() {
    document.querySelectorAll('td, span, div').forEach((el) => {
      const t = txt(el);
      if (t === 'NaN H/s') el.textContent = '0 H/s';
      if (t === 'NaN') el.textContent = '0';
      if (t === 'undefined (0%)') el.textContent = '0 (0%)';
      if (t === 'undefined') el.textContent = '0';
    });
  }

  function run() {
    fixHelp();
    fixPortBadges();
    fixNaN();
  }

  const mo = new MutationObserver(run);
  window.addEventListener('load', () => {
    run();
    mo.observe(document.documentElement, { childList: true, subtree: true });
  });
  setInterval(run, 1000);
})();
