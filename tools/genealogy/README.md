# Academic genealogy chart

The People page ends with a chart of Dr. Lee's doctoral lineage, in the style of the [UC Berkeley CFD Lab's chart](https://cfd.me.berkeley.edu/fun-stuff/).

Files:

- `genealogy.mmd`: the chart in Mermaid flowchart syntax. Names, years, degrees and arrows are edited here.
- `render.py`: draws `genealogy.mmd` with Mermaid 12.1.0 in headless Chrome and writes `_includes/genealogy.svg`.
- `_includes/genealogy.html`: the section on the People page (heading, intro with the MGP reference, chart). Styles are in `assets/css/people.css`.

The page includes the finished SVG. Mermaid's browser build is 5.5 MB, so drawing the chart once keeps the People page light, loads no extra script, and leaves the names readable to search engines and screen readers.

## Sources

Degrees and advisors are from the [Mathematics Genealogy Project](https://www.mathgenealogy.org/id.php?id=321608) (MGP), and years of birth and death from Wikidata, both checked on 2026-10-08. The people shown follow the Berkeley chart, with these changes from MGP:

- Rudolf Lipschitz's second advisor is Martin Ohm (Dr. phil., Erlangen, 1811). The Berkeley chart has his brother, Georg Simon Ohm.
- Karl F. Herzfeld's doctorate is from Wien (1914). The Berkeley chart has München. MGP lists Friedrich Hasenöhrl and Arnold Sommerfeld as his advisors, so Hasenöhrl is added.
- Ferdinand von Lindemann's doctorate is from Erlangen (1873). The Berkeley chart has Nürnberg.
- Joseph-Louis Lagrange was born in 1736. The Berkeley chart has 1726.
- Karl Christian von Langsdorf was a student of Abraham Gotthelf Kästner, so an arrow joins the two.

As in the Berkeley chart, the oldest people show only their years, and other advisors listed on MGP (for example Laplace for Poisson) are left out. A dotted arrow from Dr. Lee leads to a dashed box with an ellipsis, for the students of the lab.

## Change the chart

1. Edit `genealogy.mmd`. Each box is one line such as `klein["<span class='g-name'>Felix Klein</span><br/><span class='g-sub'>1849–1925 | Dr. phil., Bonn, 1868</span>"]`, and each arrow is one line such as `klein --> lindemann` (advisor to student).
2. Render it, from the repository root and with internet access (Mermaid and the Figtree font are loaded from their CDNs):

   ```
   python3 tools/genealogy/render.py /path/to/chrome
   ```

   Any Chrome or Chromium binary works, for example Google Chrome or the `chrome-headless-shell` that Playwright installs.
3. Check the People page locally with `bundle exec jekyll serve`, on a wide screen and a phone-sized window.
4. Commit `genealogy.mmd` and `_includes/genealogy.svg` together.

To change the Mermaid version, update `MERMAID_URL` and `MERMAID_SRI` in `render.py`. The integrity value is the sha384 hash of the file: `openssl dgst -sha384 -binary mermaid.min.js | openssl base64 -A`.
