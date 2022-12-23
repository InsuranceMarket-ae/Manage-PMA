import fs from 'fs'
import path from 'node:path';
import { MJML_PATH, PMA_TEMPLATES_PATH, MJML_MAIN_FILE_NAME, HTML_OUTPUT_FILE_NAME } from '../constants/index.js';
import logger from '../helpers/logger.js';
import { execAsync, fileExistsInTemplate, getListOfPMATemplates } from '../helpers/index.js';

const getOverWrite = (options) => options?.overwrite == undefined ? true : options?.overwrite
const cleanHTMLCode = async (options) => {
    logger.info('Cleaning HTML to support postmark html format', options.template)

    const folderName = options?.template;
    const templateDirectory = path.resolve(PMA_TEMPLATES_PATH, `./${folderName}/`)
    const htmlFilePath = `${templateDirectory}/${HTML_OUTPUT_FILE_NAME}`

    const data = await fs.promises.readFile(htmlFilePath, 'utf-8');
    const modifiedData = data.replace(/<link[^>]*>/g, '');

    await fs.promises.writeFile(htmlFilePath, modifiedData);
}
const generateHTMLfromMJML = async (options) => {
    try {
        if (!fs.existsSync(MJML_PATH)) return logger.error("MJML not found, Please install dependencies using command 'npm i' or 'yarn' ")

        const folderName = options?.template;
        const overwrite = getOverWrite(options)
        if (folderName && !overwrite && fileExistsInTemplate(folderName, HTML_OUTPUT_FILE_NAME)) return logger.info(`Template '${folderName}' already has an HTML file,\n Please use --overwrite if you want to regenerate HTML`)
        if (folderName?.length) {
            const templateDirectory = path.resolve(PMA_TEMPLATES_PATH, `./${folderName}/`)
            const templatePath = path.resolve(templateDirectory, MJML_MAIN_FILE_NAME)
            if (!fs.existsSync(templatePath)) return console.error(`Template with name '${folderName}' does not exist, please make sure that your ${MJML_MAIN_FILE_NAME} file is placed at '${templatePath}' `)
            logger.info(`Generating HTML for PMA template => '${folderName}'`)

            const mjmltoHTMLCmd = `${MJML_PATH} ${MJML_MAIN_FILE_NAME} -o ${HTML_OUTPUT_FILE_NAME}`
            logger.info('executing command => ', mjmltoHTMLCmd)
            await execAsync(mjmltoHTMLCmd, { cwd: templateDirectory })
            await cleanHTMLCode(options)

            logger.success(`Succesfully generated HTML for template '${folderName}'`)

            return true;
        }

        return generateHTMLForAllFiles(options)


    } catch (e) {
        return logger.error(e)
    }
}

const generateHTMLForAllFiles = async (options) => {
    const overwrite = getOverWrite(options)
    try {
        logger.info("Process started for generating HTML for PMA templates")
        const listOfTemplates = await getListOfPMATemplates()
        if (!listOfTemplates.length) return logger.error(`No templates found! looking at: ${PMA_TEMPLATES_PATH}`)

        let templates = overwrite ? listOfTemplates : listOfTemplates.filter(template => !template?.htmlExists)

        const templatesStr = templates?.map(d => d?.name)?.join(", ")
        if (templates?.length) {
            if (overwrite) logger.warn(`You're using 'overwrite', this will re-generate HTML for all the templates. \n available templates are: ${templatesStr}`);
            else logger.info(`generating HTML for templates: ${templatesStr}`)
            const promises = templates.map(template => generateHTMLfromMJML({ template: template.name, ...options }))
            await Promise.all(promises)
            return logger.success(`Succesfully generated HTML for templates: ${templatesStr}`)
        }
        return logger.info('HTML files are already generated for all the templates,\n Please use --overwrite if you want to regenerate HTML')
    } catch (e) {
        return logger.error(e)
    }
}

export default generateHTMLfromMJML