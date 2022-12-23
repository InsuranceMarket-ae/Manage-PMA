
import { Command, } from 'commander';
import deploy from './commands/deploy.js';
import generateHTMLfromMJML from './commands/mjmlToHTML.js';

const program = new Command();

program
    .name('deployment to postmark cli')
    .description('CLI to deploy our postmark templates to server with one command.')
    .version('0.1');


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