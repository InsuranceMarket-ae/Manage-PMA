
<p align="center">A Basic CLI tool for managing templates for MJML and Postmark sending emails</p>
<p>The cli tool looks for PMA folder, and inside PMA folder it looks for templates</p>

Basically it follows this folder structure:



## Usage

Please install it globally and after installation, type `manage-mjpm` in your command line to see a list of available commands.

```bash
$ manage-mjpm

  Commands:
    manage-mjpm mjmlToHTML <command> [options]  Converts all templates to HTMLs
    manage-mjpm deploy <command> [options] Converts all templates to HTML and deploy the converted html to postmark.

  Options:
    --version  Show version number
```

## Installation

- Install [Node.js](https://nodejs.org/en/)
- `$ npm i manage-postmark-mjml-templates-cli -g`
- `$ manage-mjpm ` 
