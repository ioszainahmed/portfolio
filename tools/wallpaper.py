#!/usr/bin/env python3
"""Bake the wallpaper's CSS filter into a second image.

    python3 tools/wallpaper.py

Reads assets/wallpaper.jpg and writes assets/wallpaper-tuned.jpg with

    saturate(1.45) contrast(0.8) brightness(0.72)

already applied, so the stylesheet can use it as a plain background.

Why bake it rather than let CSS do it:

  A filter promotes an element into its own composited layer, and on iOS Safari
  that layer stops tracking the viewport — a `position: fixed` wallpaper drifts
  as the page scrolls and exposes bands of the page background above and below
  it. Moving the filter onto a child of the fixed element was not enough. With
  the filter gone from the stylesheet entirely there is nothing left to promote.

  It is also faster. The browser was re-filtering a full-screen image on every
  frame, on the one device class least able to afford it.

The numbers themselves were chosen by measurement, not taste: the image has a
near-white band across the middle, exactly where the Connect and Tools rows
sit, and this combination is 35% brighter and 26% more colourful than the flat
dark scrim it replaced while holding white app labels at 4.57:1 (AA is 4.5:1).
Change them here, then re-measure rather than adjusting by eye.
"""

import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets', 'wallpaper.jpg')
OUT = os.path.join(ROOT, 'assets', 'wallpaper-tuned.jpg')

SATURATE = 1.45
CONTRAST = 0.80
BRIGHTNESS = 0.72


def build_lut():
    """A per-channel lookup table for contrast then brightness.

    Both are per-channel and order-dependent, and CSS applies them left to
    right, so contrast runs first here as it does in the filter list.
    """
    lut = []
    for v in range(256):
        v = (v - 127.5) * CONTRAST + 127.5   # contrast()
        v = v * BRIGHTNESS                   # brightness()
        lut.append(max(0, min(255, int(round(v)))))
    return lut


def saturation_matrix(s):
    """The SVG feColorMatrix saturate matrix that CSS saturate() is defined by."""
    return (
        0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0,
        0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0,
        0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0,
    )


def main():
    img = Image.open(SRC).convert('RGB')
    img = img.convert('RGB', saturation_matrix(SATURATE))
    lut = build_lut()
    img = img.point(lut * 3)
    img.save(OUT, 'JPEG', quality=88, optimize=True, progressive=True)

    before = os.path.getsize(SRC) / 1024
    after = os.path.getsize(OUT) / 1024
    print('%s  %.0fK  (source %.0fK)' % (os.path.relpath(OUT, ROOT), after, before))


if __name__ == '__main__':
    main()
