import { stringToArray } from '../utils.js';

var env = import('dotenv')
  .then(({ config }) => config())
  .catch((_) => process.env || import.env || {});

export const BASE_URL = env.BASE_URL;
export const SITE_URL = env.SITE_URL;
export const SITE_TITLE = env.SITE_TITLE;
export const REPOSITORY_URL = env.REPOSITORY_URL || env.GH_REPO_URL;
export const ALLOWED_AUTHORS = stringToArray(env.ALLOWED_AUTHORS || env.GH_AUTHORS || 'nberlette,sw-yx')
export const LABELS_PUBLISHED = stringToArray(env.LABELS_PUBLISHED);
export const LABELS_DRAFT = stringToArray(env.LABELS_DRAFT);
export const DEFAULT_OG_IMAGE = env.DEFAULT_OG_IMAGE;
