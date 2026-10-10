"""Makes the site icons in assets/images/favicon/ and /favicon.ico.

The icon is a 2x2 monogram, PF over AL (Predictive Fluid and Aeroscience Lab),
in Figtree ExtraBold (the site's typeface), white on NTU blue #181C62.

- The blue square fills the icon to the edges, so each platform applies its own
  corner rounding (iOS, Android, Windows tiles, browser tabs).
- The letters stay inside a circle around the centre, so the icon still reads
  when a platform masks it to a full circle: within 40% of the size from the
  centre on the maskable app icons (the maskable safe zone), within 44% on all
  other icons.
- Layout: two columns. P is centred over A, and F and L line up on their stems.
  The block of four letters is centred both ways.
- At 16 px, scaled outlines blur, so a hand-drawn pixel version is used: in the
  16 px frame of favicon.ico, and in favicon.svg when it is drawn at 24 px or
  smaller.

Usage, from the repository root (needs fontTools and Pillow):
    python3 tools/favicon/make_favicons.py
The script checks the centring and the circle fit of every file it writes.
"""
import json
import math
import os
import tempfile

from fontTools.pens.basePen import BasePen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from PIL import Image, ImageFont, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(ROOT, 'assets', 'images', 'favicon')
FONT = os.path.join(HERE, 'Figtree[wght].ttf')

BLUE_HEX = '#181c62'
BLUE = (24, 28, 98)
WEIGHT = 800            # Figtree ExtraBold
GAP = 120               # space between columns and between rows, in font units (cap height 700)
RADIUS_ANY = 0.44       # farthest letter point from the centre, as a share of the icon size
RADIUS_MASKABLE = 0.40  # maskable safe zone (W3C manifest spec)
SVG_SIZE = 512
SMALL_SVG_MAX_PX = 24   # favicon.svg switches to the pixel version at this size or below

# Hand-drawn 16 px version: 5x5 letters, 2 px gaps, 2 px margins.
PIXEL_LETTERS = {
    'P': ['####.', '#...#', '####.', '#....', '#....'],
    'F': ['#####', '#....', '####.', '#....', '#....'],
    'A': ['.###.', '#...#', '#####', '#...#', '#...#'],
    'L': ['#....', '#....', '#....', '#....', '#####'],
}
PIXEL_ORIGINS = {'P': (2, 2), 'F': (9, 2), 'A': (2, 9), 'L': (9, 9)}


class PointsPen(BasePen):
    """Collects points along the outline, curves sampled, for the circle check."""

    def __init__(self, glyph_set, steps=16):
        super().__init__(glyph_set)
        self.points, self.steps = [], steps

    def _moveTo(self, p):
        self.points.append(p)

    def _lineTo(self, p):
        self.points.append(p)

    def _qCurveToOne(self, p1, p2):
        p0 = self._getCurrentPoint()
        for k in range(1, self.steps + 1):
            t = k / self.steps
            u = 1 - t
            self.points.append((u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
                                u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]))

    def _curveToOne(self, p1, p2, p3):
        p0 = self._getCurrentPoint()
        for k in range(1, self.steps + 1):
            t = k / self.steps
            u = 1 - t
            self.points.append((u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0],
                                u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1]))


def load_font(tmp):
    font = instancer.instantiateVariableFont(TTFont(FONT), {'wght': WEIGHT}, inplace=False)
    path = os.path.join(tmp, 'Figtree-%d.ttf' % WEIGHT)
    font.save(path)
    return font, path


def layout(font):
    """Places the 4 glyphs around (0, 0) in font units, y up.

    Returns {letter: (glyph name, x shift, baseline)} and the largest distance
    of any outline point from the centre."""
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    cap = font['OS/2'].sCapHeight
    ink = {}
    for ch in 'PFAL':
        pen = BoundsPen(glyphs)
        glyphs[cmap[ord(ch)]].draw(pen)
        ink[ch] = pen.bounds
    width = {ch: ink[ch][2] - ink[ch][0] for ch in ink}
    col1 = max(width['P'], width['A'])
    col2 = max(width['F'], width['L'])
    left = -(col1 + GAP + col2) / 2
    right_col = left + col1 + GAP
    top_base, bottom_base = GAP / 2, -GAP / 2 - cap
    place = {
        'P': (left + (col1 - width['P']) / 2, top_base),   # P centred over A
        'A': (left + (col1 - width['A']) / 2, bottom_base),
        'F': (right_col, top_base),                        # F and L share the stem line
        'L': (right_col, bottom_base),
    }
    result, far = {}, 0.0
    for ch in 'PFAL':
        name = cmap[ord(ch)]
        shift = place[ch][0] - ink[ch][0]
        base = place[ch][1]
        result[ch] = (name, shift, base)
        pen = PointsPen(glyphs)
        glyphs[name].draw(pen)
        for x, y in pen.points:
            far = max(far, math.hypot(x + shift, y + base))
    return result, far


def svg_text(font, placed, far):
    glyphs = font.getGlyphSet()
    scale = RADIUS_ANY * SVG_SIZE / far
    centre = SVG_SIZE / 2
    number = lambda v: ('%.2f' % v).rstrip('0').rstrip('.')
    paths = []
    for ch in 'PFAL':
        name, shift, base = placed[ch]
        pen = SVGPathPen(glyphs, ntos=number)
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, centre + scale * shift, centre - scale * base)))
        paths.append(pen.getCommands())
    cell = SVG_SIZE / 16
    rects = []
    for ch, rows in PIXEL_LETTERS.items():
        x0, y0 = PIXEL_ORIGINS[ch]
        for r, row in enumerate(rows):
            c = 0
            while c < len(row):          # one rect per horizontal run of pixels
                if row[c] != '#':
                    c += 1
                    continue
                start = c
                while c < len(row) and row[c] == '#':
                    c += 1
                rects.append('<rect x="%s" y="%s" width="%s" height="%s"/>' % (
                    number((x0 + start) * cell), number((y0 + r) * cell), number((c - start) * cell), number(cell)))
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 %d %d">'
            '<title>PFAL</title>'
            '<style>.px{display:none}@media (max-width:%dpx){.vec{display:none}.px{display:inline}}</style>'
            '<rect width="%d" height="%d" fill="%s"/>'
            '<path class="vec" fill="#fff" d="%s"/>'
            '<g class="px" fill="#fff" shape-rendering="crispEdges">%s</g>'
            '</svg>\n') % (SVG_SIZE, SVG_SIZE, SVG_SIZE, SVG_SIZE, SMALL_SVG_MAX_PX, SVG_SIZE, SVG_SIZE, BLUE_HEX,
                           ''.join(paths), ''.join(rects))


def raster(font_path, placed, far, size, radius):
    """Draws the icon at 16x its size with FreeType, then scales it down."""
    ss = 16 if size <= 64 else max(4, 2048 // size)
    big = size * ss
    scale = radius * big / far              # pixels per font unit
    face = ImageFont.truetype(font_path, round(scale * 1000 * 64) / 64)  # 1000 units per em
    mask = Image.new('L', (big, big), 0)
    draw = ImageDraw.Draw(mask)
    centre = big / 2
    for ch in 'PFAL':
        _, shift, base = placed[ch]
        draw.text((centre + scale * shift, centre - scale * base), ch, font=face, fill=255, anchor='ls')
    mask = mask.resize((size, size), Image.LANCZOS)
    icon = Image.new('RGB', (size, size), BLUE)
    icon.paste((255, 255, 255), mask=mask)
    return icon


def pixel16():
    icon = Image.new('RGB', (16, 16), BLUE)
    px = icon.load()
    for ch, rows in PIXEL_LETTERS.items():
        x0, y0 = PIXEL_ORIGINS[ch]
        for r, row in enumerate(rows):
            for c, v in enumerate(row):
                if v == '#':
                    px[x0 + c, y0 + r] = (255, 255, 255)
    return icon


def check(icon, radius, label):
    """Fails if the letters are off centre by more than half a pixel or reach past the circle."""
    size = icon.size[0]
    lum = icon.convert('L')
    base = lum.getpixel((0, 0))
    mask = lum.point(lambda v: 255 if v > base + 24 else 0)
    x0, y0, x1, y1 = mask.getbbox()
    lr, tb = abs(x0 - (size - x1)), abs(y0 - (size - y1))
    px = mask.load()
    far = max(math.hypot(x + 0.5 - size / 2, y + 0.5 - size / 2)
              for y in range(size) for x in range(size) if px[x, y])
    limit = radius * size + 1.0          # one pixel of slack for anti-aliasing
    ok = lr <= 1 and tb <= 1 and far <= limit and icon.getpixel((0, 0)) == BLUE
    print('%-34s %4d px  margins L/R %d/%d T/B %d/%d  farthest %.1f px (limit %.1f)  %s' % (
        label, size, x0, size - x1, y0, size - y1, far, limit, 'ok' if ok else 'FAILED'))
    if not ok:
        raise SystemExit('make_favicons.py: %s failed the check' % label)


def main():
    with tempfile.TemporaryDirectory() as tmp:
        font, font_path = load_font(tmp)
        placed, far = layout(font)
        with open(os.path.join(OUT, 'favicon.svg'), 'w', newline='\n') as f:
            f.write(svg_text(font, placed, far))

        icons = {}
        for name, size, radius in [
            ('favicon-96x96.png', 96, RADIUS_ANY),
            ('apple-touch-icon.png', 180, RADIUS_ANY),
            ('icon-192x192.png', 192, RADIUS_ANY),
            ('icon-512x512.png', 512, RADIUS_ANY),
            ('web-app-manifest-192x192.png', 192, RADIUS_MASKABLE),
            ('web-app-manifest-512x512.png', 512, RADIUS_MASKABLE),
        ]:
            icon = raster(font_path, placed, far, size, radius)
            check(icon, radius, name)
            icon.save(os.path.join(OUT, name), optimize=True)
            icons[name] = icon

        frames = [pixel16(), raster(font_path, placed, far, 32, RADIUS_ANY), raster(font_path, placed, far, 48, RADIUS_ANY)]
        check(frames[0], 0.5, 'favicon.ico 16 (pixel version)')
        for frame in frames[1:]:
            check(frame, RADIUS_ANY, 'favicon.ico %d' % frame.size[0])
        for path in (os.path.join(OUT, 'favicon.ico'), os.path.join(ROOT, 'favicon.ico')):
            frames[2].save(path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)], append_images=frames[:2])
            with Image.open(path) as ico:
                sizes = sorted(ico.info['sizes'])
                ico.size = (16, 16)
                sixteen = ico.convert('RGB')
            if sizes != [(16, 16), (32, 32), (48, 48)] or sixteen.tobytes() != frames[0].tobytes():
                raise SystemExit('make_favicons.py: %s does not hold the expected frames' % path)

        manifest_path = os.path.join(OUT, 'site.webmanifest')
        with open(manifest_path) as f:
            manifest = json.load(f)
        folder = '/assets/images/favicon/'
        manifest['icons'] = [
            {'src': folder + 'icon-192x192.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'any'},
            {'src': folder + 'icon-512x512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any'},
            {'src': folder + 'web-app-manifest-192x192.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'maskable'},
            {'src': folder + 'web-app-manifest-512x512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'},
        ]
        with open(manifest_path, 'w', newline='\r\n') as f:   # the repository keeps CRLF line endings
            json.dump(manifest, f, indent=2)
            f.write('\n')
    print('make_favicons.py: wrote the icons to %s and /favicon.ico' % os.path.relpath(OUT, ROOT))


if __name__ == '__main__':
    main()
