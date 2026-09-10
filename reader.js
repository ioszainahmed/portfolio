/* ==========================================================================
   Article navigation bar

   iOS large-title behaviour: the title sits large in the hero and collapses
   into the sticky bar once it scrolls underneath. The bar is sticky in CSS
   and the back link is a plain anchor, so the way back works at any scroll
   position whether or not this script runs — all this adds is the title swap.

   A plain scroll listener, deliberately: IntersectionObserver is the tidier
   tool and requestAnimationFrame the usual throttle, but neither fires under
   headless Chrome's virtual clock, which left this unverifiable. One
   getBoundingClientRect and a classList.toggle on a passive listener is cheap
   enough that the throttle was not buying much.
   ========================================================================== */

'use strict';

(function () {
  const bar = document.querySelector('.reader-bar');
  const title = document.querySelector('.reader-title');
  if (!bar || !title) return;

  function sync() {
    /* Swap as the title passes under the bar, not as it leaves the viewport. */
    const condensed = title.getBoundingClientRect().bottom <= bar.offsetHeight;
    bar.classList.toggle('is-condensed', condensed);
  }

  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync, { passive: true });
  sync();
})();
