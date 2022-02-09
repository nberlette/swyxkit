import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import relativeImages from 'mdsvex-relative-images';
import remarkGfm from 'remark-gfm';
import remarkSectionize from 'remark-sectionize';

const repository = process.env.GH_REPO_URL || 'https://github.com/sw-yx/swyxkit.git';
// mdsvex config
export const mdsvexConfig = {
  extensions: ['.svelte.md', '.md', '.svx'],
  layout: {
    _: './src/lib/layouts/_.mdsvex.svelte', // default
  },
  smartypants: { dashes: 'oldschool' },
  remarkPlugins: [
    [remarkGithub, {repository}],
    [remarkGfm],
    [remarkAbbr],
    [relativeImages],
    [remarkSectionize]
  ],
  rehypePlugins: [
    [rehypeSlug],
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  ]
};

export default mdsvexConfig;
