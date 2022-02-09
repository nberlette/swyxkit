import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import relativeImages from 'mdsvex-relative-images';

const repository = process.env.GH_REPO_URL || 'https://github.com/sw-yx/swyxkit.git';
// mdsvex config
export const mdsvexConfig = {
  extensions: ['.svelte.md', '.md', '.svx'],
  layout: {
    _: './src/lib/layouts/_.mdsvex.svelte', // default
    // flex: './src/lib/layouts/flex.mdsvex.svelte',
    // list: './src/lib/layouts/list.mdsvex.svelte',
    // post: './src/lib/layouts/post.mdsvex.svelte',
    // photo: './src/lib/layouts/photo.mdsvex.svelte',
  },
  smartypants: { dashes: 'oldschool' },
  remarkPlugins: [
    [remarkGithub, { repository }],
    [remarkAbbr],
    [relativeImages],
  ],
  rehypePlugins: [
    [rehypeSlug],
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  ]
};

export default mdsvexConfig;