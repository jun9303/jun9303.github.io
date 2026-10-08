# Predictive Fluid and Aeroscience Lab website

Source of <https://pfaero.science>, the website of the Predictive Fluid and Aeroscience Lab (PFAL), School of Mechanical and Aerospace Engineering, Nanyang Technological University. It is a Jekyll site built on a customized copy of the Minimal Mistakes theme.

## Where to edit

| Page or setting | Files |
| --- | --- |
| Home | `index.md` |
| Research | `_pages/research.md`, figures in `assets/images/research/` |
| People | one file per person in `_people/` (see `_people/README.md`), groups in `_data/people_groups.yml`, alumni in `_people/alumni.yml` |
| Academic genealogy chart (People page) | `tools/genealogy/` (see its README) |
| Publications | BibTeX files in `_bibliography/`, page in `_pages/publications.md` |
| News | one post per item in `_posts/`, list in `news/index.html` |
| Contact Us and Available Positions | `_pages/contact_us.md` |
| Lab interest form (Google Forms) | `tools/google_form/` (see its README); the link is `application_form_url` in `_config.yml` |
| Menu | `_data/navigation.yml` |
| Site settings, author, footer links | `_config.yml` |
| Page styles | `assets/css/` (one file per page); theme styles in `_sass/` |
| CV | `assets/pdfs/cv-sangjoon-lee.pdf` |

News posts get short URLs such as `/news/7f5a6f0a6f/` from `_plugins/news_hash_permalink.rb`.

Site search is off (`search: false`). Turning it on also needs the theme's `assets/js/lunr/` files, which are not in this repository.

## Preview and publish

Preview locally (Ruby and Bundler installed):

```
bundle install
bundle exec jekyll serve --livereload --force_polling --port 4000
```

Then open <http://localhost:4000>.

Every push to `master` builds and deploys the site with GitHub Actions (`.github/workflows/pages.yml`). The new version is live about a minute after the push.

## Domain, email, and crawlers

- **Domain:** `pfaero.science` is registered at Cloudflare. Its DNS records point to GitHub Pages and are set to DNS only. The custom domain is set in the repository's Settings > Pages, with Enforce HTTPS on. `CNAME` records the domain in the repository.
- **Email:** `contact@pfaero.science` receives mail only. Cloudflare Email Routing forwards it to the lab's Gmail account.
- **Search engines and AI crawlers:** `robots.txt` lets search engines crawl the site and disallows AI crawlers and agents (the list follows <https://github.com/ai-robots-txt/ai.robots.txt>). `ai.txt`, `.well-known/tdmrep.json`, and meta tags in `_includes/head/custom.html` opt out of AI training and text and data mining. Jekyll writes `sitemap.xml`. The 32-character `.txt` file in the root is the IndexNow key; keep it.
- **Security contact:** `.well-known/security.txt`. Renew its `Expires` date before 2027-10-01.
- **Font Awesome** is loaded from jsDelivr at a fixed version with integrity hashes (`_includes/head.html` and `_includes/scripts.html`). To update it, change the version and the hashes together.

## License

`LICENSE` is the MIT license of the Minimal Mistakes theme (Michael Rose), on which the layouts, includes, styles, and `assets/js/main.min.js` of this site are based. It does not cover the text, images, and documents of the lab.
