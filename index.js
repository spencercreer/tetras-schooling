const inquirer = require('inquirer')
const fs = require('fs')

function init() {
    var gMd = require('./utils/generateMarkdown')
    inquirer.prompt(questions).then(response =>
        fs.writeFile('tutor-template', gMd(respons, (err) =>
            err ? console.error(err) : console.log(`--------------\tutor-template generated\n--------------`))
        )
    )
}

const questions = [
    {
        type: 'list',
        message: "Select tutor email template.",
        choices: ['Introductory', 'Confirmation', 'Stand-in', 'Reassignment', 'Blast'],
        name: 'template',
    },
    {
        type: 'input',
        message: "What is the student's first and last name?",
        name: 'full-name',
    },
    {
        type: 'input',
        message: 'What is the Date of the scheduled session?',
        name: 'date',
    },
    {
        type: 'input',
        message: 'Enter the scheduled session time',
        name: 'time',
    },
    {
        type: 'list',
        message: "What is the students time zone?",
        choices: ['Eastern Daylight Time', 'Eastern Standard Time', 'Central Daylight Time', 'Central Standard Time', 'Mountain Daylight Time', 'Mountain Standard Time', 'Pacific Daylight Time', 'Pacific Standard Time'],
        name: 'time-zone'
    }
]

init()