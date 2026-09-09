# iosza.in

Personal portfolio for Zain Ahmed, built as an iPhone home screen. No
dependencies — static files served straight from GitHub Pages.

```
index.html      markup, meta, structured data
styles.css      design tokens + layout
script.js       content data and interaction
clock.js        the status bar clock, shared by the home screen and /notes/
assets/         app icons, favicon, social card

content/notes/  the notes, in Markdown — the only file you edit to publish
build.py        turns those into the pages below
notes/          generated: the app view, one directory per article, feed.xml
sitemap.xml     generated
```

The generated HTML is committed. Pages stays dumb, every article is a real
document at a real URL, and there is nothing to run on deploy.

## Run it

Open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000
```

## How it works

**Desktop** stages the phone in a dark room. Selecting an app in the Experience
row slides the phone left and opens a detail panel beside it.

**Notes** is two surfaces. `/notes/` is the app opened over the home screen,
still inside the frame — a list of titles reads fine at 393px. `/notes/<slug>/`
drops the frame entirely, because two thousand words at 393px does not.

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

## Publishing a note

Write the Markdown, run the build, commit what it wrote:

```sh
$EDITOR content/notes/2026-09-14-a-new-note.md
python3 build.py
git add content notes sitemap.xml index.html && git commit
```

Front matter is required, and all four keys are:

```markdown
---
title: A new note
date: 2026-09-14
slug: a-new-note
description: One sentence. It is the meta description, the link preview, the
  feed summary and the preview line in the widget, so make it read.
---

## A section

Body copy, **bold**, *italic*, `code`, [links](https://example.com), lists,
> blockquotes

and fenced code blocks with a language tag.
```

`slug` sets the URL: `/notes/a-new-note/`. The date in the filename is only for
sorting the directory by eye — the `date` in the front matter is what counts.

The build writes `notes/<slug>/index.html`, rewrites `notes/index.html`,
`notes/feed.xml` and `sitemap.xml`, and injects the four most recent titles and
dates into the home screen widget between the markers in `index.html`. Editing
those rows by hand does nothing; the next build overwrites them.

Renaming a slug leaves the old directory behind, and the build removes it —
but only if its `index.html` carries the build's stamp, so a hand-written page
dropped into `notes/` is never deleted by a rename.

Markdown support is a deliberate subset: headings (`##` is a section, `###` a
subsection — the article's `<h1>` is the title from the front matter),
paragraphs, bold, italic, inline code, links, images, ordered and unordered
lists, fenced code blocks, blockquotes and rules. Anything else falls through
as paragraph text rather than disappearing.

## Assets

Icons are stored at 180px (3x for a 60px tile). Regenerate the social card and
touch icon with the script in the commit that added them if the wording changes.

## Notes

- Layout and behaviour share one breakpoint: the `767px` media query in
  `styles.css` and the `matchMedia` query in `script.js` must stay in step.
- `--dur-sheet` in the CSS is mirrored by `SHEET_MS` in the JS, which schedules
  teardown after the exit transition.
- `script.js` is the home screen's, and it resolves `#detail` at module scope —
  do not load it on a page without the detail panel. The status bar clock is in
  `clock.js` for exactly that reason.
