# iOS-Style Portfolio (Apple Theme)

A single-page portfolio that looks like an iPhone Home Screen with two widgets (About + Blog) and an app grid.

## Structure
- `index.html` — markup
- `styles.css` — Apple-inspired styling
- `script.js` — tiny interaction (tap animation)
- `assets/` — place local images or wallpapers here (optional)

## Run
Just open `index.html` in any modern browser. No build step needed.

## Customize
- Replace placeholder text in the widgets.
- Swap emojis and labels in the app grid.
- To use a local wallpaper, put an image into `assets/` and change `background` in `styles.css`:
  ```css
  body { background: url('assets/your_wallpaper.jpg') center/cover no-repeat; }
  ```
