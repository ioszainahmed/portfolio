#!/usr/bin/env python3
"""Generate assets/og-card.png, the image link previews show.

    python3 tools/og-card.py

Needs Pillow. The output is committed, so this only has to run when the card
itself changes — it is not part of build.py.

The card is deliberately just the name and the domain. A link preview is
glanced at, not read, and the title and stack that used to sit here were
repeating what the page says anyway.
"""

import os
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'og-card.png')

W, H = 1200, 630
NAME = 'Zain'
DOMAIN = 'iosza.in'

SF = '/System/Library/Fonts/SFNS.ttf'
FALLBACK = '/System/Library/Fonts/Helvetica.ttc'


def load_font(size, weight='Bold'):
    from PIL import ImageFont
    path = SF if os.path.exists(SF) else FALLBACK
    font = ImageFont.truetype(path, size)
    try:
        for name in font.get_variation_names():
            name = name.decode() if isinstance(name, bytes) else name
            if name.strip() == weight:
                font.set_variation_by_name(name)
                break
    except Exception:
        pass  # static font, or no named instances
    return font


def mesh(w, h, scale=4):
    """The site's wallpaper language: an indigo base with warm and cool lobes.

    Computed small and upscaled with a blur — a per-pixel loop at full size is
    slow for no visible gain on a gradient this soft.
    """
    sw, sh = w // scale, h // scale
    img = Image.new('RGB', (sw, sh), (26, 12, 48))
    px = img.load()
    lobes = [
        (0.06, -0.12, 1.05, (255, 138, 61), 1.00),
        (1.04, 0.02, 0.85, (240, 53, 110), 1.00),
        (0.92, 1.12, 0.95, (31, 182, 255), 0.85),
        (-0.14, 1.04, 0.90, (123, 63, 242), 1.00),
    ]
    for y in range(sh):
        fy = y / sh
        for x in range(sw):
            fx = x / sw
            r, g, b = 30, 14, 56
            for cx, cy, rad, (lr, lg, lb), amp in lobes:
                dx = fx - cx
                dy = (fy - cy) * (h / w)
                d = (dx * dx + dy * dy) ** 0.5
                t = max(0.0, 1.0 - d / rad) ** 2.2
                r += int(lr * t * amp)
                g += int(lg * t * amp)
                b += int(lb * t * amp)
            px[x, y] = (min(r, 255), min(g, 255), min(b, 255))
    return img.resize((w, h), Image.BICUBIC).filter(ImageFilter.GaussianBlur(scale * 1.5))


def main():
    img = mesh(W, H).convert('RGBA')

    # Left-weighted scrim: contrast for the type without flattening the
    # gradient into mud on the right.
    scrim = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(scrim)
    for x in range(W):
        alpha = int(150 * max(0.0, 1 - (x / W) / 0.85))
        d.line([(x, 0), (x, H)], fill=(6, 3, 16, alpha))
    img = Image.alpha_composite(img, scrim)

    d = ImageDraw.Draw(img)
    f_name = load_font(140, 'Bold')
    f_domain = load_font(30, 'Regular')

    # Optically centred on the name's own bounding box rather than its line
    # box, which sits low because of descender space the word does not use.
    bbox = d.textbbox((0, 0), NAME, font=f_name)
    d.text((88 - bbox[0], H / 2 - (bbox[3] - bbox[1]) / 2 - bbox[1] - 20),
           NAME, font=f_name, fill=(255, 255, 255))
    d.text((92, H / 2 + 70), DOMAIN, font=f_domain, fill=(255, 255, 255, 140))

    img.convert('RGB').save(OUT, 'PNG', optimize=True)
    print('%s  %.0fK' % (os.path.relpath(OUT, ROOT), os.path.getsize(OUT) / 1024))


if __name__ == '__main__':
    main()
