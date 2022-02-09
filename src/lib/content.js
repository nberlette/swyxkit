// @ts-nocheck
import {compile} from 'mdsvex';
import {dev} from '$app/env';
import {
	GH_TOKEN,
	GH_USER_REPO,
	BASE_URL,
	SITE_URL,
	API_URL,
	ALLOWED_AUTHORS,
	LABELS_PUBLISHED,
	LABELS_DRAFT,
	SITE_TITLE,
} from '$lib/config/site';
import { createApiUrl, createOGImageUrl, safeDisplayToken } from '$lib/utils';

import grayMatter from 'gray-matter';
import fetch from 'node-fetch';
import parse from 'parse-link-header';
import slugify from 'slugify';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLink from 'rehype-autolink-headings';

const remarkPlugins = undefined;
const rehypePlugins = [
	[rehypeStringify],
	[rehypeSlug],
	[rehypeAutoLink, { behavior: 'wrap', properties: {class:'hover:text-yellow-100 no-underline'} }]
];

const allowedPosters = [...ALLOWED_AUTHORS];
const publishedTags = [...LABELS_PUBLISHED];

let allBlogposts = [];
// let etag = null // todo - implmement etag header
``;
export async function listContent() {
	// use a diff var so as to not have race conditions while fetching
	// TODO: make sure to handle this better when doing etags or cache restore

	/** @type {import('./types').ContentItem[]} */
	let _allBlogposts = [];
	let next = null;
	let limit = 0; // just a failsafe against infinite loop - feel free to remove
	const authheader = GH_TOKEN && {
		Authorization: `token ${GH_TOKEN}`
	};
	do {
		const res = await fetch(
			next?.url ?? API_URL,
			{
				headers: authheader
			}
		);

		const issues = await res.json();
		if ('message' in issues && res.status > 400)
			throw new Error(res.status + ' ' + res.statusText + '\n' + (issues && issues.message));
		issues.forEach(
			/** @param {import('$lib/types').GithubIssue} issue */
			(issue) => {
				if (
					issue.labels.some((label) => publishedTags.includes(label.name)) &&
					allowedPosters.includes(issue.user.login)
				) {
					_allBlogposts.push(parseIssue(issue));
				}
			}
		);
		const headers = parse(res.headers.get('Link'));
		next = headers && headers.next;
	} while (next && limit++ < 1000); // just a failsafe against infinite loop - feel free to remove
	 // use valueOf to make TS happy https://stackoverflow.com/a/60688789/1106414
	_allBlogposts.sort((a, b) => b.date.valueOf() - a.date.valueOf());
	allBlogposts = _allBlogposts;
	return _allBlogposts;
}

export async function getContent(slug) {
	// get all blogposts if not already done - or in development
	if (dev || allBlogposts.length === 0) {
		console.log('loading allBlogposts');
		allBlogposts = await listContent();
		console.log('loaded ' + allBlogposts.length + ' blog posts');
		if (!allBlogposts.length)
			throw new Error(
				'failed to load blogposts for some reason. check token' + safeDisplayToken(process.env.GH_TOKEN)
			);
	}
	if (!allBlogposts.length) throw new Error('no blogposts');
	// find the blogpost that matches this slug
	const blogpost = allBlogposts.find((post) => post.slug.toLowerCase() === slug.toLowerCase());
	if (blogpost) {
		// compile it with mdsvex
		const content = (
			await compile(blogpost.content, {
				remarkPlugins,
				rehypePlugins
			})
		).code
			// https://github.com/pngwn/MDsveX/issues/392
			.replace(/>{@html `<code class="language-/g, '><code class="language-')
			.replace(/<\/code>`}<\/pre>/g, '</code></pre>');

		return { ...blogpost, content };
	} else {
		throw new Error('Post not found for slug: ' + slug);
	}
}

/**
 * @param {import('./types').GithubIssue} issue
 * @returns {import('./types').ContentItem}
 */
function parseIssue(issue) {
	const src = issue.body;
	const { content, data } = grayMatter(src);
	let title = data.title ?? issue.title;
	let slug;
	if (data.slug) {
		slug = data.slug;
	} else {
		slug = slugify(title);
	}
	let description = data.description || data.excerpt || content.trim().split('\n')[0];
	// you may wish to use a truncation approach like this instead...
	// let description = (data.content.length > 300) ? data.content.slice(0, 300) + '...' : data.content

	/** @type {string[]} */
	let tags = [];
	if (data.tags) tags = Array.isArray(data.tags) ? data.tags : [data.tags];
	tags = tags.map(tag => tag.toLowerCase());
	// console.log(slug, tags);

	return {
		type: 'blog', // futureproof in case you want to add other types of content
		content,
		frontmatter: data,
		title,
		subtitle: data.subtitle,
		description,
		category: data.category,
		tags,
		image: data.image ?? data.cover_image ?? createOGImageUrl(`# ${title}\n## ${SITE_TITLE}`, {
			icons: data.image_icons ?? data.icons ?? ['svelte.svg', 'tailwindcss.svg'],
			fontSize: 48,
			code: false
		}),
		canonical: data.canonical, // for canonical URLs of something published elsewhere
		slug: slug.toLowerCase(),
		date: new Date(data.date ?? issue.created_at),
		author: issue.user,
		ghMetadata: {
			issueUrl: issue.html_url,
			commentsUrl: issue.comments_url,
			title: issue.title,
			labels: issue.labels,
			created_at: issue.created_at,
			updated_at: issue.updated_at,
			reactions: issue.reactions
		}
	};
}
