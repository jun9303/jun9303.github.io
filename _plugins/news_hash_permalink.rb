# frozen_string_literal: true

# News item URLs: /news/<id>/ with a short id that looks random but does not
# change between builds.
#
#   id = first 10 hex characters of SHA-256("pfal-news:" + file name)
#   _posts/2026-11-01-lab-launch.md -> SHA-256("pfal-news:2026-11-01-lab-launch.md")
#
# The id is made from the file name (with its extension). Renaming the file gives
# the post a new URL; editing the title, date or text does not.
#
# Front matter options for one post:
#   news_id: lab-launch      # use this id: /news/lab-launch/
#   permalink: /news/x/      # use this URL; this plugin does not change it
#
# The plugin also sets the post's slug to the id. Jekyll builds post.id from
# the folder of the URL plus the slug, and jekyll-feed writes post.id as the
# <id> of each entry in feed.xml. With the default slug, the <id> would show
# the file name (/news/lab-launch), a path that returns 404.
# The site does not use post.slug: news-feed-item.html makes the automatic
# title from the file path, and comments are off for posts.
#
# The hook runs after Jekyll reads all posts (front matter included) and before
# pagination, feed.xml, the sitemap and page rendering ask for post URLs.
# A :posts :post_init hook would run too early: Jekyll reads front matter after
# post_init, so news_id would not be visible there.
#
# Custom plugins need a build without --safe. The GitHub Actions workflow
# (.github/workflows/pages.yml) runs "bundle exec jekyll build", so this loads.

require "digest"

module NewsHashPermalink
  SALT = "pfal-news:"
  ID_LENGTH = 10

  def self.hash_id(doc)
    Digest::SHA256.hexdigest(SALT + File.basename(doc.path))[0, ID_LENGTH]
  end

  def self.custom_id(doc)
    raw = doc.data["news_id"]
    return nil if raw.nil?

    id = Jekyll::Utils.slugify(raw.to_s)
    if id.empty?
      Jekyll.logger.warn "News id:", "#{doc.relative_path}: news_id #{raw.inspect} is empty after cleanup, using the hash id"
      return nil
    end
    id
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  site.posts.docs.each do |doc|
    next unless doc.data["permalink"].to_s.strip.empty?

    id = NewsHashPermalink.custom_id(doc) || NewsHashPermalink.hash_id(doc)
    doc.data["permalink"] = "/news/#{id}/"
    doc.data["slug"] = id
  end
end
