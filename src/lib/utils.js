import { SITE_TITLE, GH_USER_REPO } from '$lib/config/site';

/**
 * Split a string on delimiters of comma (`,`), pipe (`|`), or semicolon (`;`).
 * Returns an array with whitespace trimmed from start/end of each item.
 * @param {string} str - target string to split
 * @returns {string[]}
 */
function stringToArray(str = '') {
  return str.split(/\s*([,]|[\|]|[;])\s*/ig).map(s => s.trim());
}

/**
 * Construct the GitHub Issues API URL for fetching our blog posts content.
 * @param {string} repo
 * @param {number} per_page
 * @returns {string}
 */
function createApiUrl(repo = GH_USER_REPO, per_page = 100) {
  return `https://api.github.com/repos/${repo}/issues?state=all&per_page=${per_page}`
}

/**
 * Construct an OpenGraph Image URL with the given text and icons. Uses icns.ml
 * and og-image.vercel.app services to provide dynamic rendering services.
 * @link https://og-image.vercel.app
 * @link https://icns.ml
 * @param {string} title
 * @param {{[key: string]: any}} options
 * @returns {string}
 */
function createOGImageUrl(title = SITE_TITLE, {
  icons = ['svelte.svg', 'tailwindcss.svg'],
  iconSize = 300,
  fontSize = 120,
  foreground = '#ff3e00',
  background = '#112233',
  gradientFrom = '#ff3e0022',
  gradientTo = '#1230',
  shadowColor = '#0002',
  theme = 'dark',
  code = true
}) {
  const euc = (str) => str
    .replace(/([<>\[\]/:;{}()#\s ]+|[^a-z0-9-_]+)/ig, ent =>
      encodeURIComponent(ent));

  const styles = `<style>code{color:${foreground};text-shadow:0 0.1em 0 ${shadowColor}}svg,img{filter:drop-shadow(0 0.1em 0 ${shadowColor})}img:first-child,.plus,code::before,code::after{display:none}html,body{background:${background} linear-gradient(40deg, ${gradientFrom} 0%, ${gradientTo} 150%)}</style>`;
  const iconsString = icons.map(icon =>
    `images=${euc(
      new URL(icon.startsWith('http') ? icon : 'https://icns.ml/' + icon).href
    )}&widths=${iconSize}&widths=${iconSize}`).join('&');

  return ('https://og-image.vercel.app/' + euc(`${(code ? '**<code>'+title+'</code>**' : '**'+title+'**') + styles}`) + `.png?md=1&images=https%3A%2F%2Fassets.vercel.com&heights=0&widths=0&fontSize=${fontSize}px&theme=${theme}&${iconsString}`);
}

/**
 * Returns an authentication token (or any string, for that matter) with only
 * part of it being visible in plain text.
 * @example console.log(safeDisplayToken(process.env.GITHUB_TOKEN))
'ghp_faTcOAtq****************************'
 * @param {string} token
 * @param {number} visible
 * @returns
 */
function safeDisplayToken(token, visible = 12) {
  const length = token.length;
  return token.slice(0, visible) + ('*'.repeat(length - visible));
}

export {
  createApiUrl,
  createApiUrl as create_api_url,
  safeDisplayToken,
  safeDisplayToken as safe_display_token,
  stringToArray,
  stringToArray as string_to_array,
  createOGImageUrl,
  createOGImageUrl as create_ogimage_url
}
