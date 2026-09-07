# Architecture notes

Working notes for anyone (human or model) changing this site. `README.md` covers
running and editing it; this file covers why things are shaped the way they are.

## Design system

The site's premise is that an iOS engineer's portfolio should be built the way
iOS is built, so the details are taken from the real thing rather than
approximated.

**Type.** `-apple-system` first, so Apple devices render genuine SF. Inter is
loaded as the fallback for everyone else — the site previously requested
`SF Pro Display` from Google Fonts, which does not exist there, so non-Apple
visitors silently got Arial.

Sizes are the iOS ramp (`--t-large` 34 … `--t-caption2` 11). The frame is 393px
wide, matching an iPhone 15 Pro at 1x, so these are true point sizes. Keep them
that way instead of introducing arbitrary `clamp()` values.

**Color.** `--wall` is the stock iOS wallpaper. It is deliberately the real
Apple image rather than a generated gradient: it is what makes the page read as
*an iPhone* instead of a generic phone, and that recognisability is the point.

The image runs the full spectrum at full saturation, including a near-white band
across the middle where the Connect and Tools rows sit, so `--wall-scrim` does
the legibility work. Compositing the scrim over the image, worst-case contrast
for the white app labels is **5.04:1** with the current stops and **1.08:1**
with no scrim at all — the latter being what the site shipped before, with
text-shadows papering over it. Lightening the stops by about 0.10 yields a more
vivid wallpaper at 3.52:1, which is under AA for 11px labels. Adjust with that
trade in mind rather than by eye.

The page background behind the phone stays near black, so the wallpaper is the
only saturated thing on screen.

**Motion.** `--ease-sheet` is the curve iOS uses to present sheets;
`--spring` is a real spring with the overshoot left in. One orchestrated
entrance on load, then motion only in response to a tap.

## Layout

`.stage` centers the phone. `.detail` is absolutely positioned and translated
into place beside it; opening adds `.detail-open` to `.stage`, which slides the
phone left and the panel in.

Below 768px the frame is removed, `.detail` becomes a fixed bottom sheet, and
the wallpaper pseudo-elements switch to `position: fixed` so they do not slide
away as the page scrolls.

### Widget arrangement

The two widgets are sized against real iOS widget proportions: small is 1:1,
medium is about 2.15:1. Side by side inside the desktop frame they land at
0.86 — near enough to a pair of small widgets. On a phone the same two columns
collapse to 0.51, which is no iOS size at all and wraps the name, the tagline
and every note title, so they stack below 449px and land at 2.19 (medium) with
every string on one line.

Stacking costs height rather than saving it — 285px to 358px, taking the page
from 844 to 966 at iPhone 14 width. That is deliberate. Safari's chrome leaves
roughly 734px of viewport on that device, so the dock sits below the fold
either way and the fold is not a reason to prefer one arrangement. Vertical
space is only genuinely scarce on desktop, where the frame is a fixed 892px and
does not scroll — which is why the columns stay side by side there.

### Geometry constraints

The offsets in the breakpoints are computed, not eyeballed. Two things make them
easy to get wrong:

- A transform does not change an element's layout box. In the ≤900px block the
  phone is scaled to 0.84, so its offsets are figured from its *visual*
  half-width (433 × 0.84 / 2), not 433 / 2.
- A `visibility: hidden` element still counts toward `scrollWidth`. The resting
  offset of `.detail` therefore stays close to its open position; parking it far
  to the right gave the page a phantom horizontal scrollbar.

After changing any of these, check that `document.documentElement.scrollWidth`
still equals `clientWidth` at 768, 900, 1180 and 1440 — those are the widths
where the rules change hands.

## Traps

**Do not give `.phone-frame`'s entrance animation `animation-fill-mode: both`.**
A forwards-filling animation keeps ownership of `transform` after it ends, which
beats `.stage.detail-open .phone-frame` and stops the phone sliding aside — the
panel then opens on top of it. It is `backwards` for that reason.

**Keep the breakpoint in one place conceptually.** `styles.css` breaks at 767px
and `script.js` uses `matchMedia('(max-width: 767px)')`. The old code sniffed the
user agent, so an iPad on a wide viewport got the desktop layout with mobile
scroll-locking and swipe handling bolted on.

**`--dur-sheet` and `SHEET_MS` are a pair.** The JS waits that long before
clearing panel markup and removing a dismissed sheet. Change one, change both.

## JavaScript

One delegated `click` listener dispatches on `data-action`. There is a single
`layers` stack for Escape, so the topmost surface closes and nothing leaks —
previously each modal added its own key listener and only removed it if you
actually pressed Escape.

`lockScroll` / `unlockScroll` are reference-counted and restore the scroll
offset; the earlier version applied `position: fixed` without recording
`scrollY`, so closing a sheet dropped you at the top of the page.

`openDetail` reuses the persistent `.detail-panel` element and re-renders its
markup, so swipe handlers are attached once at startup rather than per open.
Modal sheets are created and destroyed, so their listeners die with the node.

## Accessibility

App icons are `<button>` and `<a>` elements — they were `<div>`s with click
handlers, which left the whole grid unreachable by keyboard. Dialogs use
`inert` when closed (not `hidden`, which would kill the transition), trap Tab
while open, and restore focus to the trigger on close. Decorative chrome (the
status bar, signal, battery, icon images behind text labels) is `aria-hidden`
or `alt=""` so it is not announced twice.

`prefers-reduced-motion` is respected globally.

## Verifying changes

There is no test suite. Render it and look:

```sh
python3 -m http.server 8899
```

Headless Chrome clamps `--window-size` to a 500px minimum, so a narrow
`--screenshot` is a *crop of a 500px render*, not a phone-width layout — it will
show phantom overflow that is not real. To check true phone widths, load the
page in an iframe of the exact size and screenshot the wrapper.
