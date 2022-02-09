import preprocess from 'svelte-preprocess';
import adapter from '@svelterun/adapter-auto';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.html', ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess({postcss: true})
	],

	kit: {
		adapter: adapter(),
	}
};

export default config;
