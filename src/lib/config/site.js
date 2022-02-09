import * as _ from '$lib/config/env';
import { createApiUrl, createOGImageUrl } from '$lib/utils';

export const SWYXKIT_URL = 'https://swyxkit.netlify.app/';
export const SITE_URL = new URL(_.SITE_URL || 'https://swyxkit.pages.dev').href;
export const BASE_URL = new URL(_.BASE_URL || SITE_URL).origin;

// used for pulling github issues and offering comments
const GIT_REPO_URL = new URL(_.REPOSITORY_URL || _.GH_USER_REPO);
export const GH_USER_REPO = (GIT_REPO_URL.pathname || 'nberlette/swyxkit').replace(/^\/|(\.git|\/)$/ig, '');
export const REPOSITORY_URL = GIT_REPO_URL.href.replace(/\.git$/ig, '');
export const REPO_URL = REPOSITORY_URL;

export const API_URL = _.API_URL || createApiUrl(GH_USER_REP0, 100);

export const SITE_TITLE = (_.SITE_TITLE || 'SwyxKit');
export const SITE_DESCRIPTION = _.SITE_DESCRIPTION || "swyx's default SvelteKit + Tailwind starter";
export const SITE_KEYWORDS = _.SITE_KEYWORDS || "swyxkit,sveltekit,svelte,nberlette,swyx,blog,starter,tailwindcss,cloudflare,netlify,vercel,static";

export const DEFAULT_OG_IMAGE = createOGImageUrl(SITE_TITLE, { icons: ['svelte.svg','tailwindcss.svg'] })

// social media connections
export const MY_TWITTER_HANDLE = (_.AUTHOR_TWITTER || 'nberlette');
export const TWITTER_LINK = new URL(MY_TWITTER_HANDLE, 'https://twitter.com/').href;

export const MY_YOUTUBE = (_.AUTHOR_YOUTUBE || 'swyxTV');
export const YOUTUBE_LINK = new URL(MY_YOUTUBE, 'https://youtube.com/').href;

export const MY_UNSPLASH = (_.AUTHOR_UNSPLASH || '@nberlette');
export const UNSPLASH_LINK = new URL(MY_UNSPLASH, 'https://unsplash.com').href;

export const MY_EMAIL = (_.AUTHOR_EMAIL || 'nick@berlette.com')
export const EMAIL_LINK = new URL(`mailto:${MY_EMAIL}`).href;

// dont forget process.env.GH_TOKEN
// if supplied, raises rate limit from 60 to 5000
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
