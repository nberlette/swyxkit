// @ts-nocheck
import {config} from 'dotenv';
const env = config();

/**
 * @type {{[key: string]: string}}
 */
export default { ...env, ...import.meta.env, ...process.env };
