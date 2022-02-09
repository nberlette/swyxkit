import { CACHE_MAXAGE_API } from '$lib/config/site.js';
import { getContent } from '$lib/content.js';

export async function onRequestGet({ params }) {
  try {
    const data = await getContent(params.slug);
    return new Response(JSON.stringify(data, null, '\t'), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Cache-Control': `public, s-maxage=${CACHE_MAXAGE_API}, stale-while-revalidate=60, stale-if-error=3600`
      }
    });
  } catch (err: any) {
    return new Response(err.message, { status: err.code })
  }
}
