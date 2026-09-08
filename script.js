/* ==========================================================================
   Zain Ahmed — iOS-style portfolio
   ========================================================================== */

'use strict';

/* --- Content -------------------------------------------------------------
   Bullets starting with "•" render as a list. A trailing "(hyperlink: URL)"
   turns that bullet into a link.
   ------------------------------------------------------------------------ */

const projects = {
  'Marriott': {
    title: 'Marriott Bonvoy',
    role: 'iOS Engineer @ Marriott International',
    dateRange: 'Jan 2023 – Present',
    icon: 'assets/bonvoy.png',
    description: [
      '• Marriott Bonvoy App (hyperlink: https://apps.apple.com/us/app/marriott-bonvoy-book-hotels/id455004730)',
      '• Own features end-to-end from design through production, driving multi-million dollar annual booking revenue.',
      "• Architected the SwiftUI foundation underpinning the team's SPM feature package, standardizing state-driven UI patterns.",
      '• Ensure full test coverage across features, building reusable testing helpers for async and state-driven workflows.',
      '• Led end-to-end migration of a core app tab from legacy Objective-C and UIKit to SwiftUI-first, ADA-compliant architecture.',
      '• Migrated REST eAPI services to GraphQL via Apollo, reducing over-fetching and simplifying feature integrations.',
      "• Automated feature-branch builds via Harness CI/CD's Execute Pipeline API, eliminating manual build coordination for the team."
    ].join('\n'),
    tech: ['Swift', 'SwiftUI', 'GraphQL', 'Apollo', 'SPM', 'XCTest', 'Harness CI/CD', 'Accessibility']
  },

  'myQ': {
    title: 'myQ Garage and Access',
    role: 'Software Engineer @ Chamberlain Group',
    dateRange: 'Nov 2021 – Dec 2022',
    icon: 'assets/myQ.png',
    description: [
      '• myQ Garage and Access App (hyperlink: https://apps.apple.com/us/app/myq-garage-access-control/id456282559)',
      '• Configured iOS communication with garage openers, gates and smart cameras, using CoreBluetooth for device onboarding and MQTT with WebSocket state sync for live door status.',
      '• Built live camera viewing and motion-alert handling, including stored clip playback for reviewing entry events.',
      '• Shipped shared access and auto-close scheduling, letting owners grant entry to family and service providers.',
      '• Built and deployed a shared analytics package via Carthage, enabling consistent event logging across both myQ apps.'
    ].join('\n'),
    tech: ['Swift', 'SwiftUI', 'CoreBluetooth', 'MQTT', 'WebSocket', 'IoT', 'Carthage']
  },

  'Community': {
    title: 'myQ Community',
    role: 'Software Engineer @ Chamberlain Group',
    dateRange: 'Nov 2021 – Dec 2022',
    icon: 'assets/community.png',
    description: [
      '• myQ Community App (hyperlink: https://apps.apple.com/us/app/myq-community/id1516518499)',
      '• Built the resident video intercom flow, letting residents answer a call from the main entrance and grant entry from the same screen.',
      '• Implemented guest passes for visitors, deliveries and service providers, with time-bound access to shared community doors and gates.',
      '• Migrated Storyboard views to programmatic UI and SwiftUI, adopting Combine for reactive state management across multi-tenant access flows.'
    ].join('\n'),
    tech: ['Swift', 'SwiftUI', 'Combine', 'Video Intercom', 'Access Control', 'Programmatic UI']
  },

  'WanaSell': {
    title: 'WanaSell',
    role: 'iOS Developer @ WanaSell',
    dateRange: 'Jun 2019 – Oct 2021',
    icon: 'assets/wanasell.png',
    description: [
      '• WanaSell App (hyperlink: https://apptopia.com/ios/app/1521338655/about)',
      '• Implemented real-time object detection with AVFoundation, Vision, and CoreML for in-camera product recognition.',
      '• Owned full lifecycle from conception to App Store release: URLSession/Codable networking, Firebase auth and storage, Instruments profiling to eliminate memory leaks.'
    ].join('\n'),
    tech: ['Swift', 'UIKit', 'AVFoundation', 'Vision', 'CoreML', 'URLSession', 'Firebase', 'Instruments']
  },

  'Notes': {
    title: 'Notes',
    description: "A space for in-progress thoughts, technical notes, and ideas I'm actively refining. This section is evolving and will be published soon.",
    tech: ['Drafts', 'Ideas', 'In Progress']
  },

  'App Store': {
    title: 'App Store',
    description: "A curated list of iOS applications I've built and shipped. App links and release details will be added as they go live.",
    tech: ['Shipping Soon', 'Production', 'iOS']
  },

  'Swift': {
    title: 'Swift',
    description: 'Building iOS applications with Swift. Expertise in modern Swift features, SwiftUI, and UIKit development.',
    tech: ['async/await', 'actors', 'tasks', 'generics', 'protocols', 'extensions', 'ARC', 'error-handling']
  },

  'SwiftUI': {
    title: 'SwiftUI',
    description: "Building modern, declarative user interfaces with SwiftUI. Creating beautiful and responsive iOS apps with Apple's latest UI framework.",
    tech: ['views', 'modifiers', 'state', 'bindings', 'environment', 'navigation', 'stacks', 'lists', 'animations', 'accessibility']
  },

  'Xcode': {
    title: 'Xcode',
    description: "Professional iOS development using Xcode. Creating, debugging, and optimizing apps with Apple's integrated development environment.",
    tech: ['debugging', 'instruments', 'profiling', 'memory-leaks', 'breakpoints', 'simulators', 'test-plans', 'coverage']
  },

  'Dev Stack': {
    title: 'Dev Stack',
    description: 'My development technology stack and tools. The technologies, frameworks, and tools I use to build iOS applications.',
    tech: ['GraphQL', 'Apollo', 'REST', 'Git', 'Python', 'automation', 'Figma', 'CI', 'analytics', 'Cursor', 'Claude']
  }
};

/* --- Helpers ------------------------------------------------------------- */

/* Matches the CSS breakpoint exactly, so layout and behaviour never disagree
   (the old user-agent sniff treated an iPad on a wide viewport as mobile). */
const mobileQuery = window.matchMedia('(max-width: 767px)');
const isMobile = () => mobileQuery.matches;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const SHEET_MS = 480; /* keep in sync with --dur-sheet */
const exitDuration = () => (reduceMotion.matches ? 0 : SHEET_MS);

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

/* --- Status bar clock ---------------------------------------------------- */

const timeEl = document.getElementById('time');

function tickClock() {
  if (!timeEl) return;
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

/* --- Scroll lock ---------------------------------------------------------
   Reference-counted, and it restores the scroll position on release — the
   previous version dropped you back at the top of the page.
   ------------------------------------------------------------------------ */

let lockCount = 0;
let lockedAt = 0;

function lockScroll() {
  if (lockCount++ > 0) return;
  lockedAt = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${lockedAt}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  window.scrollTo(0, lockedAt);
}

/* --- Focus management ---------------------------------------------------- */

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(container) {
  const onKeydown = (e) => {
    if (e.key !== 'Tab') return;
    const items = Array.from(container.querySelectorAll(FOCUSABLE));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  container.addEventListener('keydown', onKeydown);
  return () => container.removeEventListener('keydown', onKeydown);
}

/* --- Layer stack ---------------------------------------------------------
   One Escape listener for the whole page, closing whatever is on top. The
   old code added a listener per modal and only removed it if you actually
   pressed Escape.
   ------------------------------------------------------------------------ */

const layers = [];

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && layers.length) {
    e.preventDefault();
    layers[layers.length - 1]();
  }
});

/* --- Swipe to dismiss ----------------------------------------------------- */

function swipeToDismiss(el, onDismiss, { scrollHost = el } = {}) {
  let startY = 0;
  let startX = 0;
  let delta = 0;
  let dragging = false;
  let axisLocked = false;

  const reset = () => {
    el.style.transition = '';
    el.style.transform = '';
  };

  el.addEventListener('touchstart', (e) => {
    if (!isMobile() || e.touches.length !== 1) return;
    /* Only start a drag from the top of the scroll area, so the gesture does
       not fight the panel's own scrolling. */
    if (scrollHost.scrollTop > 0) return;
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
    delta = 0;
    dragging = true;
    axisLocked = false;
    el.style.transition = 'none';
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const dy = e.touches[0].clientY - startY;
    const dx = Math.abs(e.touches[0].clientX - startX);

    if (!axisLocked) {
      if (Math.abs(dy) < 6 && dx < 6) return;
      if (dx > Math.abs(dy)) { dragging = false; reset(); return; }
      axisLocked = true;
    }

    if (dy > 0) {
      delta = dy;
      /* Rubber-band past 200px instead of tracking the finger 1:1. */
      const eased = delta > 200 ? 200 + (delta - 200) * 0.35 : delta;
      el.style.transform = `translateY(${eased}px)`;
    }
  }, { passive: true });

  const end = () => {
    if (!dragging) return;
    dragging = false;
    el.style.transition = '';
    if (delta > 110) {
      onDismiss();
    } else {
      el.style.transform = '';
    }
  };

  el.addEventListener('touchend', end, { passive: true });
  el.addEventListener('touchcancel', end, { passive: true });
}

/* --- Description rendering ------------------------------------------------ */

function renderDescription(description) {
  if (!description) return '';

  return description.split('\n').map((raw) => {
    const line = raw.trim();
    if (!line) return '';

    if (line.startsWith('•')) {
      const link = line.match(/\(hyperlink:\s*(https?:\/\/[^)]+)\)/);
      const text = line
        .replace(/\s*\(hyperlink:\s*https?:\/\/[^)]+\)/, '')
        .replace(/^•\s*/, '')
        .trim();

      if (link) {
        return `<div class="detail-bullet"><a class="detail-link" href="${esc(link[1])}" target="_blank" rel="noopener noreferrer">${esc(text)}</a></div>`;
      }
      return `<div class="detail-bullet">${esc(text)}</div>`;
    }

    return `<p>${esc(line)}</p>`;
  }).join('');
}

/* --- Detail panel --------------------------------------------------------- */

const stage = document.querySelector('.stage');
const detail = document.getElementById('detail');
const detailPanel = detail.querySelector('.detail-panel');

let detailOpen = false;
let detailReturnFocus = null;
let releaseDetailFocus = null;
let detailCloseTimer = 0;

function openDetail(key) {
  const data = projects[key];
  if (!data) return;

  window.clearTimeout(detailCloseTimer);

  detailPanel.innerHTML = `
    <div class="detail-grabber" aria-hidden="true"></div>
    <button class="detail-close" type="button" aria-label="Close">&#10005;</button>
    <div class="detail-head">
      ${data.icon ? `<div class="detail-icon"><img src="${esc(data.icon)}" alt="" width="128" height="128"></div>` : ''}
      <div>
        <h2 class="detail-title" id="detail-title">${esc(data.title)}</h2>
        ${data.role ? `<div class="detail-role">${esc(data.role)}</div>` : ''}
        ${data.dateRange ? `<div class="detail-date">${esc(data.dateRange)}</div>` : ''}
      </div>
    </div>
    <div class="detail-body">
      ${renderDescription(data.description)}
      <div class="detail-tech">
        ${data.tech.map((t) => `<span>${esc(t)}</span>`).join('')}
      </div>
    </div>
    <button class="detail-dismiss" type="button">Close</button>
  `;

  detailPanel.scrollTop = 0;
  detailPanel.style.transform = '';

  if (!detailOpen) {
    detailOpen = true;
    detailReturnFocus = document.activeElement;
    detail.removeAttribute('inert');
    stage.classList.add('detail-open');
    if (isMobile()) lockScroll();
    releaseDetailFocus = trapFocus(detail);
    layers.push(closeDetail);
  }

  detailPanel.querySelector('.detail-close').focus({ preventScroll: true });
}

function closeDetail() {
  if (!detailOpen) return;
  detailOpen = false;

  stage.classList.remove('detail-open');
  detail.setAttribute('inert', '');

  const i = layers.indexOf(closeDetail);
  if (i !== -1) layers.splice(i, 1);

  if (releaseDetailFocus) { releaseDetailFocus(); releaseDetailFocus = null; }
  unlockScroll();

  if (detailReturnFocus && document.contains(detailReturnFocus)) {
    detailReturnFocus.focus({ preventScroll: true });
  }
  detailReturnFocus = null;

  /* Clear the panel only after it has animated out. */
  detailCloseTimer = window.setTimeout(() => {
    if (!detailOpen) {
      detailPanel.innerHTML = '';
      detailPanel.style.transform = '';
    }
  }, exitDuration());
}

swipeToDismiss(detailPanel, closeDetail);

detailPanel.addEventListener('click', (e) => {
  if (e.target.closest('.detail-close, .detail-dismiss')) closeDetail();
});

/* Tapping the dimmed backdrop closes the sheet on mobile. */
detail.addEventListener('click', (e) => {
  if (e.target === detail) closeDetail();
});

/* --- Modal sheet ---------------------------------------------------------- */

function openSheet(key) {
  const data = projects[key];
  if (!data) return;

  const backdrop = document.createElement('div');
  backdrop.className = 'sheet-backdrop';

  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-labelledby', 'sheet-title');

  const href = data.link && data.link !== '#' ? data.link : null;

  sheet.innerHTML = `
    <div class="sheet-head">
      <h2 class="sheet-title" id="sheet-title">${esc(data.title)}</h2>
      <button class="detail-close" type="button" aria-label="Close" style="position:static">&#10005;</button>
    </div>
    <p>${esc(data.description)}</p>
    <div class="detail-tech">
      ${data.tech.map((t) => `<span>${esc(t)}</span>`).join('')}
    </div>
    ${href ? `<a class="sheet-cta" href="${esc(href)}" target="_blank" rel="noopener noreferrer">Open ${esc(data.title)}</a>` : ''}
  `;

  backdrop.appendChild(sheet);
  document.body.appendChild(backdrop);

  const returnFocus = document.activeElement;
  lockScroll();
  const releaseFocus = trapFocus(sheet);

  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;

    backdrop.classList.remove('open');
    const i = layers.indexOf(close);
    if (i !== -1) layers.splice(i, 1);

    releaseFocus();
    unlockScroll();
    if (returnFocus && document.contains(returnFocus)) {
      returnFocus.focus({ preventScroll: true });
    }
    window.setTimeout(() => backdrop.remove(), exitDuration());
  };

  layers.push(close);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop || e.target.closest('.detail-close')) close();
  });

  swipeToDismiss(sheet, close);

  requestAnimationFrame(() => {
    backdrop.classList.add('open');
    sheet.querySelector('.detail-close').focus({ preventScroll: true });
  });
}

/* --- Dispatch ------------------------------------------------------------
   One delegated listener, driven by data attributes, replacing the previous
   per-icon binding that read the label text and matched on the row heading.
   ------------------------------------------------------------------------ */

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-action]');
  if (trigger) {
    const { action, project } = trigger.dataset;
    if (action === 'experience') openDetail(project);
    else if (action === 'modal') openSheet(project);
    return;
  }

  /* Desktop: clicking away from both the phone and the panel closes it.
     On mobile the backdrop is `.detail` itself and is handled above. */
  if (detailOpen && !isMobile() && !e.target.closest('.phone-frame, .detail')) {
    closeDetail();
  }
});

/* Crossing the breakpoint mid-session leaves the scroll lock and any in-flight
   drag transform in an inconsistent state, so reset both. */
mobileQuery.addEventListener('change', () => {
  detailPanel.style.transform = '';
  if (detailOpen) {
    if (isMobile() && lockCount === 0) lockScroll();
    if (!isMobile() && lockCount > 0) unlockScroll();
  }
});
