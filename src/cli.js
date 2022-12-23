#!/usr/bin/env node

import { Command, } from 'commander';
import deploy from './commands/deploy.js';
import generateHTMLfromMJML from './commands/mjmlToHTML.js';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const program = new Command();
const version = packageJson.version
program
    .name('deployment to postmark cli')
    .description('CLI to deploy our postmark templates to server with one command.')
    .option('-v, --version', 'Display the version of the CLI.')
    .version(version);


program.command('mjmlToHTML')
    .description('convert MJML to HTML')
    .option('-t, --template <char>', 'Name of template if you want to convert only a specific template, not all.')
    .option('-o, --overwrite', 'Overwrite the already generated html files if exists.')
    .action(generateHTMLfromMJML);

program.command('deploy')
    .description('deploying templates to postmark')
    .option('-e, --environment <char>', 'environment of server can either be staging or production')
    .option('-t, --template <char>', 'Name of template if you want to convert only a specific template, not all.')
    .option('-o, --overwrite', 'Overwrite the already generated html files if exists.')
    .option('-g, --generateHTML', 'Generate new html for the mjml templates before deployment, by default its true.')
    .action(deploy);

program.parse();