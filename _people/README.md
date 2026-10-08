---
# Not a person: Jekyll skips this file because it has no `group`.
---
One file per person. The file name sets the overlay link:
`sangjoon-lee.md` gives /people/#person-sangjoon-lee.

Front matter:
  name           shown under the photo and in the overlay
  group          pi, postdoc, graduate or undergraduate (see _data/people_groups.yml)
  order          position inside the group (smaller first; optional)
  role           one short grey line under the name (about 20 characters)
  image          square photo, cropped to a circle
  links          any of: email, cv, website, orcid, scholar, linkedin, github
                 (a missing key hides that link; email accepts "mailto:" and "?subject=")
  website_label  optional text for the website link (default "Website")
  placeholder    true for an open slot ("Open position" is added to the role line)

The text below the front matter is the bio (markdown, a few sentences).

Alumni are not person files: they are rows of the table in alumni.yml (in this
folder), each with name, group, role, affiliation and period.
