import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import path from 'path'


export const PMA_TEMPLATES_PATH = path.resolve(path.dirname('./../') || "", "./PMA")
export const MJML_PATH = path.resolve(path.dirname('./../') || "", "./node_modules/.bin/mjml")
export const MJML_MAIN_FILE_NAME = 'index.mjml'
export const HTML_OUTPUT_FILE_NAME = 'content.html'
export const ENV_STAGING = 'staging'
export const ENV_PROD = 'production'
export const PMA_STAGING = process.env.PMA_STAGING
export const PMA_PROD = process.env.PMA_PROD

