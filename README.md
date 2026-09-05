# iosza.in

Personal portfolio for Zain Ahmed, built as an iPhone home screen. No build step,
no dependencies — three files served straight from GitHub Pages.

```
index.html    markup, meta, structured data
styles.css    design tokens + layout
script.js     content data and interaction
assets/       app icons, favicon, social card
```

## Run it

Open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000
```

## How it works

**Desktop** stages the phone in a dark room. Selecting an app in the Experience
row slides the phone left and opens a detail panel beside it.

**Mobile** (≤767px) drops the frame and becomes the phone: the page fills the
viewport and detail views arrive as bottom sheets you can swipe down to dismiss.

The frame is 393px wide, matching an iPhone 15 Pro at 1x, so the iOS type ramp
in `styles.css` is used at its true point sizes rather than rescaled.

## Editing content

Everything writable lives in the `projects` object at the top of `script.js`.
Add an entry, then point an icon at it in `index.html`:

```html
<button class="icon" type="button" data-action="experience" data-project="Marriott">
```

`data-action` picks the presentation — `experience` for the side panel / bottom
sheet, `modal` for the smaller sheet. Icons without a `data-action` are plain
links. In a description, a line starting with `•` becomes a bullet, and a
trailing `(hyperlink: https://…)` turns that bullet into a link.

## Assets

Icons are stored at 180px (3x for a 60px tile). Regenerate the social card and
touch icon with the script in the commit that added them if the wording changes.

## Notes

- Layout and behaviour share one breakpoint: the `767px` media query in
  `styles.css` and the `matchMedia` query in `script.js` must stay in step.
- `--dur-sheet` in the CSS is mirrored by `SHEET_MS` in the JS, which schedules
  teardown after the exit transition.
