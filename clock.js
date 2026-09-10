/* ==========================================================================
   Status bar clock

   Shared by the home screen and the Notes app view. Both draw a status bar,
   and a page showing a frozen 9:41 one tap away from a page showing the real
   time reads as a bug rather than a stylistic choice.
   ========================================================================== */

'use strict';

(function () {
  const timeEl = document.getElementById('time');
  if (!timeEl) return;

  function tickClock() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}`;

    /* Re-arm on the minute boundary rather than every 60s from load, which
       otherwise drifts by up to 59 seconds. */
    const ms = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    window.setTimeout(tickClock, ms);
  }

  tickClock();
})();
