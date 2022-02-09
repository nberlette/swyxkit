/// <reference types="@cloudflare/workers-types" />
import { CACHE_MAXAGE_API } from '$lib/config/site.js';
import { listContent } from '$lib/content.js';

export async function onRequestGet() {
  const posts = await listContent(true);
  return new Response(JSON.stringify(posts.map(item => {
    	delete item.content // so that you dont send so much over the wire
    	// this is an ok strategy until you get to thousands of content,
    	// in that case you should probably redo the list/item data fetch strategy
    	return item
    }), null, '\t'), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Cache-Control': `public, s-maxage=${CACHE_MAXAGE_API}, stale-while-revalidate=60, stale-if-error=3600` // 1 minute.. for now
      }
  });
}
