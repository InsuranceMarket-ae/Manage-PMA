import chalk from 'chalk';

const logger = {
    ...console,
    warn: (...args) => console.info('\n', chalk.yellow(...args)),
    info: (...args) => console.info('\n', chalk.blue(...args)),
    error: (...args) => console.error('\n', chalk.red(...args)),
    success: (...args) => console.log('\n', chalk.greenBright(...args)),
}


export default logger