
import { exec } from 'node:child_process';
import util from 'node:util';
import fs from 'fs'
import fsAsync from 'fs/promises'
import path from 'path'
import { HTML_OUTPUT_FILE_NAME, MJML_MAIN_FILE_NAME, PMA_TEMPLATES_PATH } from '../constants/index.js'

export const execAsync = util.promisify(exec);

export const fileExistsInTemplate = (templateName, fileName) => fs.existsSync(path.resolve(PMA_TEMPLATES_PATH, `${templateName}/${fileName}`))

export const getListOfPMATemplates = async () => {
    const files = await fsAsync.readdir(PMA_TEMPLATES_PATH, { withFileTypes: true })
    const templates = files
        .filter(dirent => dirent.isDirectory() && fileExistsInTemplate(dirent.name, MJML_MAIN_FILE_NAME))
        .map(dirent => ({
            htmlExists: fileExistsInTemplate(dirent.name, HTML_OUTPUT_FILE_NAME),
            name: dirent.name
        }))

    return templates
}


export const tryNPM = async (packageName) => {
    try {
        await execAsync(`npm i ${packageName}`)
    } catch (e) {
        logger.error(e)
        tryYarn(packageName)
    }
}
const tryYarn = async (packageName) => {
    try {
        await execAsync(`yarn add ${packageName}`)
    } catch (e) {
        logger.error(e)
    }
}