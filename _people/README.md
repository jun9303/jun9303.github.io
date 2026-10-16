---
# Not a person: Jekyll skips this file because it has no `group`.
---
One file per person. The overlay link is /people/#person-<slug>, with the
slug from the front matter or, without one, from the name ("Jane TAN" gives
/people/#person-jane-tan). If two people get the same id, the later one gets
-2, -3, ... in page order, and those numbers can change when people are added
or removed. So give a slug to each person who shares a name with someone else
(or with an alumnus), and to anyone with a link used elsewhere, such as in
news posts. The full rule is in _includes/person-id.html.

Front matter:
  name           shown under the photo and in the overlay
  slug           optional; sets the overlay link, e.g. slug: "jane-tan"
                 (lower case and dashes; keep it once links to it exist)
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
folder), each with name, group, role, affiliation, period and slug.

When a member moves to the alumni table (graduation, end of a contract):
  1. Open the person's card and copy the part of the link after #person-
     (/people/#person-jane-tan gives jane-tan).
  2. Add a row to alumni.yml with slug set to it (slug: "jane-tan").
  3. Delete the person file.
The row then has the id person-jane-tan, so old links to
/people/#person-jane-tan go to the alumni table at that row.
