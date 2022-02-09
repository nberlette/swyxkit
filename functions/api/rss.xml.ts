import RSS from 'rss';
import { CACHE_MAXAGE_RSS, SITE_TITLE, SITE_URL } from '$lib/config/site.js';
import { listContent } from '$lib/content.js';

export async function onRequestGet() {
  const feed = new RSS({
    title: SITE_TITLE + ' RSS Feed',
    site_url: SITE_URL,
    feed_url: SITE_URL + '/rss.xml'
  });

  const allBlogs = await listContent(true);
  allBlogs.forEach((post) => {
    feed.item({
      title: post.title,
      url: SITE_URL + `/${post.slug}`,
      date: post.date,
      description: post.description
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Cache-Control': `public, s-maxage=${CACHE_MAXAGE_RSS}, stale-while-revalidate=60, stale-if-error=3600`,
      'Content-Type': 'application/rss+xml;charset=utf-8'
    }
  });
}

// misc notes for future users

// // notes - originally tried to fetch this via /api/listContent.json but...
// // cannot use url.origin because it is null during SSR...
// // const res = await fetch(url.origin + `/api/listContent.json`)

// // cannot use url.protocol because URL scheme "sveltekit" is not supported.
// // const res = await fetch(`${url.protocol}//${url.host}/api/listContent.json`);
// // const allBlogs = await res.json();

// 	// use this if you want your content in a local '/content' folder rather than github issues
// 	// let allBlogs = import.meta.globEager('/content/**/*.md')
// 	Object.entries(allBlogs).forEach(([path, obj]) => {
// 		feed.item({
// 			title: obj.title,
// 			url: SITE_URL + `/${path.slice(9).slice(0, -3)}`,
// 			date: obj.date,
// 			description: obj.description
// 		});
// 	});
