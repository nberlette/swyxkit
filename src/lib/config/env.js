// @ts-nocheck
(async () => await import('dotenv')
  .then(({config}) => config())
);

/**
 * @type {{[key: string]: string}}
 */
export const env = {...import.meta.env, ...process.env};
export default env;
