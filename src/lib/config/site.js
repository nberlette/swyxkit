import {createApiUrl, createOGImageUrl, stringToArray} from '$lib/utils';

export const GH_TOKEN = process.env.GH_TOKEN;
export const ALLOWED_AUTHORS = stringToArray(process.env.ALLOWED_AUTHORS ?? 'nberlette,sw-yx');
export const LABELS_PUBLISHED = stringToArray(process.env.LABELS_PUBLISHED ?? 'Published,Active');
export const LABELS_DRAFT = stringToArray(process.env.LABELS_DRAFT ?? 'Draft,Unpublished');

export const SWYXKIT_URL = 'https://swyxkit.netlify.app/';
export const BASE_URL = new URL(process.env.BASE_URL ?? process.env.SITE_URL ?? 'https://swyxkit.pages.dev')
export const SITE_URL = BASE_URL.href;

// used for pulling github issues and offering comments
const GIT_REPO_URL = new URL(process.env.REPOSITORY_URL ?? 'https://github.com/nberlette/swyxkit.git');
export const GH_USER_REPO = (process.env.GH_USER_REPO ?? 'nberlette/swyxkit');
export const REPOSITORY_URL = process.env.REPOSITORY_URL ?? GIT_REPO_URL.href;
export const REPO_URL = GIT_REPO_URL.href;

export const API_URL = process.env.API_URL ?? createApiUrl(GH_USER_REPO, 100);

export const SITE_TITLE = process.env.SITE_TITLE ?? 'SwyxKit';
export const SITE_DESCRIPTION = process.env.SITE_DESCRIPTION ?? "swyx's default SvelteKit + Tailwind starter";
export const SITE_KEYWORDS = process.env.SITE_KEYWORDS ?? "swyxkit,sveltekit,svelte,nberlette,swyx,blog,starter,tailwindcss,cloudflare,netlify,vercel,static";

export const BLOG_TITLE = 'Blog';
export const BLOG_DESCRIPTION = 'This is my blog, powered by SwyxKit :)';

export const DEFAULT_OG_IMAGE = createOGImageUrl(SITE_TITLE, {
  icons: ['svelte.svg', 'tailwindcss.svg']
})
export const SITE_TWITTER_CARD = 'summary';


// social media connections
export const SITE_TWITTER_HANDLE = process.env.SITE_TWITTER ?? process.env.AUTHOR_TWITTER ?? 'nberlette';
export const MY_TWITTER_HANDLE = (process.env.AUTHOR_TWITTER ?? 'nberlette');
export const TWITTER_URL = new URL(MY_TWITTER_HANDLE, 'https://twitter.com/').href;

export const MY_YOUTUBE = (process.env.AUTHOR_YOUTUBE ?? 'swyxTV');
export const YOUTUBE_URL = new URL(MY_YOUTUBE, 'https://youtube.com/').href;

export const UNSPLASH = (process.env.AUTHOR_UNSPLASH ?? '@nberlette');
export const UNSPLASH_URL = new URL(UNSPLASH, 'https://unsplash.com').href;

export const EMAIL = (process.env.AUTHOR_EMAIL ?? 'nick@berlette.com')
export const EMAIL_URL = new URL(`mailto:${EMAIL}`).href;

export const PRISM_THEME = 'monokai';
// shades-of-purple, nord, ayu-mirage, dracula, monokai, github

// dont forget process.process.env.GH_TOKEN
// if supplied, raises rate limit from 60 to 5000
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
