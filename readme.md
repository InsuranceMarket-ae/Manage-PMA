## MANAGE MJPM (MJML + POSTMARK) 
<p >A Basic CLI tool for managing templates when working wth MJML and Postmark.</p>
<a href="https://www.npmjs.com/package/manage-postmark-mjml-templates-cli" target="_blank">
<img src="https://img.shields.io/npm/v/manage-postmark-mjml-templates-cli?style=for-the-badge" />
</a>

<br/>
<p>The CLI tool looks for a folder named "PMA", and inside PMA folder it looks for templates</p>

Basically it follows this folder structure:

<img width="523" alt="Screenshot 2022-12-24 at 1 39 35 AM" src="https://user-images.githubusercontent.com/41765372/209404168-00f6a0ff-b652-483f-aa18-55e2b120ca22.png">
It will detect templated folders inside PMA folder, How? It will search "index.mjml" file since this file will be used to convert from MJML to HTML.

so as dislayed in the attached picture, there are 2 templates inside PMA folder, template1 and template2.

A template must have following files:
```
1. index.mjml
2. meta.json
```
Why? as described above the index.mjml file is used to convert from mjml to html, and meta.json will be used by postmark-cli 



How does `meta.json`  file look like? It totally depends on your template's configuration but here's how a basic template file may look like:
```
{
  "Name": "Template name",
  "Alias": "template-alias",
  "Subject": "Your template subject",
  "TemplateType": "Standard",
  "LayoutTemplate": null,
  "TestRenderModel": {
     key:"value"
  }
}

```

Side Note:
The CLI tool is dependent on `mjml` and `postmark-cli`, if these packages are not installed the cli tool will try to install them or will fail to run.

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
