# Site icons

`make_favicons.py` makes the favicon and the app icons: a 2x2 monogram, PF over AL, in Figtree ExtraBold (the site's typeface), white on NTU blue `#181C62`.

Run it from the repository root (needs `fontTools` and `Pillow`):

```
python3 tools/favicon/make_favicons.py
```

It writes these files and checks each one for centring and circle fit:

| File | Used by |
| --- | --- |
| `/favicon.ico` (16, 32, 48 px) | browsers, Windows, and tools that only look for `/favicon.ico`; a copy is also in `assets/images/favicon/` |
| `assets/images/favicon/favicon.svg` | Chrome, Firefox, and Edge tabs |
| `assets/images/favicon/favicon-96x96.png` | Google Search results and other PNG favicon users |
| `assets/images/favicon/apple-touch-icon.png` (180 px) | iOS and iPadOS home screens, Safari |
| `assets/images/favicon/icon-192x192.png`, `icon-512x512.png` | installed web app, `"purpose": "any"` in `site.webmanifest` |
| `assets/images/favicon/web-app-manifest-192x192.png`, `web-app-manifest-512x512.png` | installed web app on Android, `"purpose": "maskable"` |

Design rules:

- The blue square fills each icon to the edges, so every platform can apply its own corner rounding.
- The letters stay inside a circle around the centre, so the icon still reads when a platform masks it to a full circle: within 40% of the icon size on the maskable icons (the maskable safe zone) and within 44% on the others.
- Two columns: P is centred over A, and F and L line up on their stems. The block is centred both ways.
- At 16 px a hand-drawn pixel version is used (`PIXEL_LETTERS` in the script): in the 16 px frame of `favicon.ico`, and in `favicon.svg` when it is drawn at 24 px or smaller (a media query inside the SVG).

After you change the icons, raise the `?v=` number on the icon links in `_includes/head/custom.html`. Browsers keep favicons cached for a long time and only fetch them again when the link changes.

`Figtree[wght].ttf` is the variable Figtree font, under the SIL Open Font License 1.1 (`OFL.txt`).
