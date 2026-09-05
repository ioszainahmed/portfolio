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

**Color.** `--wall` is a CSS mesh gradient, with `--wall-scrim` pulling
luminance down through the middle band where content sits. It replaced a stock
iOS wallpaper photo that ran the full spectrum at full saturation and forced
text-shadows onto everything. The page background behind the phone stays near
black so the wallpaper is the only saturated thing on screen.

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
