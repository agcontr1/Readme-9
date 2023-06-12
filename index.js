// Include packages needed for this application
const inquirer = require('inquirer');
const { render } = require('mustache');
const fs = require('fs');

// Create an array of questions for user input
const questions = [
    {
        name: 'title',
        message: 'What is the name of your project?',
        type: 'input',
    },
    {
        name: 'description',
        message: 'Provide a short description of your project:',
        type: 'input',
    },
    {
        name: 'tableOfContents',
        message: 'Would you like to have a table of contents?',
        type: 'confirm',
        default: true,
    },
    {
        name: 'installation',
        message: 'What are the steps required to install your project?',
        type: 'input',
    },
    {
        name: 'usage',
        message: 'Provide instructions and examples for use:',
        type: 'input',
    },
    {
        name: 'credits',
        message: 'Include collaborators, attribution, or resources used (if any):',
        type: 'input',
        default: '',
    },
    {
        name: 'license',
        message: 'Choose a license:',
        type: 'list',
        choices: ['none', 'MIT License', 'GNU GPLv3', 'Apache License 2.0'],
    },
    {
        name: 'filename',
        message: 'Finally, choose the name of your markdown file:',
        type: 'input',
    }
];

// Create a template for our Markdown file
let template = `
# {{title}}

## Description

{{description}}

{{#tableOfContents}}
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

{{/tableOfContents}}
## Installation

{{installation}}

## Usage

{{usage}}

## Credits

{{credits}}

## License

{{license}}
`;

// Create a function to write README file
function writeToFile(fileName, data) {
    let output = render(template, data);
    fs.writeFileSync(`./${fileName}.md`, output);
}

// Create a function to initialize app
function init() {

    inquirer
        .prompt(questions)
        .then(answers => {
            console.info('Answers:', answers);
            writeToFile(answers.filename, answers);
        });

}

// Function call to initialize app
init();
