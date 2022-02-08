import preprocess from 'svelte-preprocess';
import adapter from '@svelterun/adapter-auto';
import { mdsvex } from 'mdsvex';
import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import('dotenv').then(({config}) => config());

// mdsvex config
const mdsvexConfig = {
	extensions: ['.svelte.md', '.md', '.svx'],
	layout: {
		_: './src/mdsvexlayout.svelte' // default mdsvex layout
	},
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [
		[
			remarkGithub,
			{
				// Use your own repository
				repository: process.env.GH_REPO_URL || 'https://github.com/sw-yx/swyxkit.git'
			}
		],
		remarkAbbr
	],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.html', ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess({
			postcss: true,
			scss: true,
			typescript: true,
		})
	],

	kit: {
		adapter: adapter(),
	}
};

export default config;
