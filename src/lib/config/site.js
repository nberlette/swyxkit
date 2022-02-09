import env from '$lib/config/env';
import {createApiUrl, createOGImageUrl, stringToArray} from '$lib/utils';

export const GH_TOKEN = env.GH_TOKEN;
export const ALLOWED_AUTHORS = stringToArray(env.ALLOWED_AUTHORS || 'nberlette,sw-yx');
export const LABELS_PUBLISHED = stringToArray(env.LABELS_PUBLISHED || 'Published,Active');
export const LABELS_DRAFT = stringToArray(env.LABELS_DRAFT || 'Draft,Unpublished');

export const SWYXKIT_URL = 'https://swyxkit.netlify.app/';
export const BASE_URL = new URL(env.BASE_URL || env.SITE_URL || 'https://swyxkit.pages.dev')
export const SITE_URL = BASE_URL.href;

// used for pulling github issues and offering comments
const GIT_REPO_URL = new URL(env.REPOSITORY_URL);
export const GH_USER_REPO = (GIT_REPO_URL.pathname || 'nberlette/swyxkit').replace(/^\/|(\.git|\/)$/ig, '');
export const REPOSITORY_URL = GIT_REPO_URL.href.replace(/\.git$/ig, '');
export const REPO_URL = REPOSITORY_URL;

export const API_URL = env.API_URL || createApiUrl(GH_USER_REPO, 100);

export const SITE_TITLE = (env.SITE_TITLE || 'SwyxKit');
export const SITE_DESCRIPTION = env.SITE_DESCRIPTION || "swyx's default SvelteKit + Tailwind starter";
export const SITE_KEYWORDS = env.SITE_KEYWORDS || "swyxkit,sveltekit,svelte,nberlette,swyx,blog,starter,tailwindcss,cloudflare,netlify,vercel,static";

export const DEFAULT_OG_IMAGE = createOGImageUrl(SITE_TITLE, {
  icons: ['svelte.svg', 'tailwindcss.svg']
})
export const SITE_TWITTER_CARD = 'summary';


// social media connections
export const SITE_TWITTER_HANDLE = env.SITE_TWITTER || env.AUTHOR_TWITTER || 'nberlette';
export const MY_TWITTER_HANDLE = (env.AUTHOR_TWITTER || 'nberlette');
export const TWITTER_URL = new URL(MY_TWITTER_HANDLE, 'https://twitter.com/').href;

export const MY_YOUTUBE = (env.AUTHOR_YOUTUBE || 'swyxTV');
export const YOUTUBE_URL = new URL(MY_YOUTUBE, 'https://youtube.com/').href;

export const UNSPLASH = (env.AUTHOR_UNSPLASH || '@nberlette');
export const UNSPLASH_URL = new URL(UNSPLASH, 'https://unsplash.com').href;

export const EMAIL = (env.AUTHOR_EMAIL || 'nick@berlette.com')
export const EMAIL_URL = new URL(`mailto:${EMAIL}`).href;


// dont forget process.env.GH_TOKEN
// if supplied, raises rate limit from 60 to 5000
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
