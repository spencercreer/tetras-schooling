const inquirer = require('inquirer')
const fs = require('fs')

// import student data from _students.txt, seperate the students, convert each object to JSON, create a names array for inquirer
var students = fs.readFileSync('_students.txt', 'utf8')
var studentsInfoArray = students.split('\r\n')
studentsInfoArray = studentsInfoArray.map(i => JSON.parse(i))
var studentsNamesArray = []
studentsInfoArray.forEach(student => {
    studentsNamesArray.push(`${student.id}-${student.firstName} ${student.lastName}`)
})

function init() {
    var gTxt = require('./utils/generateTxt')
    inquirer.prompt(initialQuestion).then(response => {
        var init = response.init
        // get the id of the selected student and find all of the selected students info
        var studentId = response.student.split('-')[0]
        var selectedStudent = studentsInfoArray.find(student => student.id === parseInt(studentId))

        if(init === 'Email confirmation') {
            inquirer.prompt(emailQuestions).then(response => {
                // add inquirer data to students info
                selectedStudent.date = response.date
                selectedStudent.time = response.time
                selectedStudent.init = init
                // generate .txt file with file system
                console.log(selectedStudent)
                fs.writeFile('_tutor-template.txt', gTxt(selectedStudent), (err) =>
                    err ? console.error(err) : console.log(`----------------------\n_tutor-template.txt\n----------------------`))
            })
        } else {
              // generate .txt file with file system
              fs.writeFile('_tutor-template.txt', gTxt(selectedStudent), (err) =>
              err ? console.error(err) : console.log(`----------------------\n_tutor-template.txt\n----------------------`))
        }
    })
}

// initial question for inquirer
const initialQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Email confirmation','Session notes'],
        name:'init'
    },
    {
        type: 'list',
        message: "Select a Student",
        choices: studentsNamesArray,
        name: 'student'
    },
]

// emailQuestions for inquirer
const emailQuestions = [
    {
        type: 'input',
        message: 'What is the date of the scheduled session?',
        name: 'date',
    },
    {
        type: 'input',
        message: 'Enter the scheduled session time in Arizona time (Enter in military time as 00:00)',
        name: 'time',
    },
]

init()