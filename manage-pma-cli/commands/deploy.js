import path from 'path'
import fs from "fs";
import generateHTMLfromMJML from "./mjmlToHTML.js";
import logger from "../helpers/logger.js";
import { PMA_STAGING, PMA_PROD, ENV_PROD, ENV_STAGING, PMA_TEMPLATES_PATH } from "../constants/index.js";
import { spawn } from 'node:child_process';

const deploy = async (options) => {
    try {
        const generateHTML = options.generateHTML
        console.log("generateHTML", generateHTML)
        const postmarkClI = path.resolve(path.dirname('./../'), './node_modules/postmark-cli')
        if (!fs.existsSync(postmarkClI)) return logger.error(`postmark-cli not found, Please install dependencies using either yarn or npm, looking at ${postmarkClI}`)
        const environment = options?.environment;
        console.log("environment", JSON.stringify(environment))
        if (!environment) return logger.error(`Please provide --environment of your postmark server. i.e: ${ENV_STAGING} or ${ENV_PROD}`)
        if (environment !== ENV_PROD && environment !== ENV_STAGING) return logger.error(`Argument --environment=${environment} is invalid.\nAllowed choices are ${ENV_STAGING}, ${ENV_PROD}.`)
        const noEnvVarMsg = `To deploy to ${environment} environment, please set PMA_STAGING environment variable. `
        if (environment == ENV_STAGING && !PMA_STAGING?.length) return logger.error(noEnvVarMsg)
        if (environment == ENV_PROD && !PMA_PROD?.length) return logger.error(noEnvVarMsg)
        logger.info("All validation passed, starting deployment process now!")

        await generateHTMLfromMJML({ ...options })
        const deploymentCommand = `node ${postmarkClI} templates push ${PMA_TEMPLATES_PATH}`
        logger.info(`executing deployment command: ${deploymentCommand}`)
        // await execAsync(deploymentCommand, { stdio: 'inherit' })

        const thirdPartyCLI = spawn('node', [postmarkClI, 'templates', 'push', PMA_TEMPLATES_PATH],
            {
                env: {
                    POSTMARK_SERVER_TOKEN: environment == ENV_PROD ? PMA_PROD : PMA_STAGING,
                    ...process.env
                }
            }
        );

        thirdPartyCLI.stdout.on('data', (data) => {
            logger.warn(`${data}`);
        });

        thirdPartyCLI.on('close', (code) => {
            if (code == 1) {
                logger.error(`Something went wrong while deploying to postmark \n\n Please make sure you have correct env variables in .env file at root of the project.`)
            }
            logger.info(`Child process exited with code ${code}`);
        });
        thirdPartyCLI.on('error', (code) => {
            logger.error(`error in child process [postmark-cli]: ${code}`);
        });
    } catch (e) {
        return logger.error(e)
    }
}


export default deploy