const moment = require('moment')
const fs = require('fs')

var links = fs.readFileSync('_links.txt', 'utf8')
var linksArray = links.split('\r\n')
linksArray = linksArray.map(i => JSON.parse(i))

function generateTxt(data) {
    var today = moment().format('L')
    var txt
    var timeZoneDiff

    if (data.init === 'Email confirmation') {
        let sessionHour = parseInt(data.time.split(':')[0])
        let sessionMinute = data.time.split(':')[1]
        let meridiem
        let sessionDate = data.date
        let textColor

        // Determine hour difference based on student's time zone
        if (data.timeZone === 'PST') {
            timeZoneDiff = -1
        } else if (data.timeZone === 'PDT' || data.timeZone === 'MST') {
            timeZoneDiff = 0
        } else if (data.timeZone === 'MDT' || data.timeZone === 'CST') {
            timeZoneDiff = 1
        } else if (data.timeZone === 'CDT' || data.timeZone === 'EST') {
            timeZoneDiff = 2
        } else if (data.timeZone === 'EDT') {
            timeZoneDiff = 3
        } else if (data.timeZone === 'AEST') {
            timeZoneDiff = 17
        }

        // Convert user entered military time to AM/PM time
        if (sessionHour === 24) {
            sessionHour -= 12
            meridiem = 'AM'
        } else if (sessionHour > 12 && sessionHour < 24) {
            sessionHour -= 12
            meridiem = 'PM'
        } else if (sessionHour === 12) {
            meridiem = 'PM'
        } else {
            meridiem = 'AM'
        }

        let sessionTime = `${sessionHour}:${sessionMinute} ${meridiem}`
        let emailDate = moment(`${sessionDate} ${sessionTime}`).add(timeZoneDiff, 'hours').format('llll')

        if(emailDate === 'Invalid date') {
            textColor = '\x1b[31m%s\x1b[0m'
            txt = 'Invalid Session Date Format'
        } else {
            textColor = '\x1b[32m%s\x1b[0m'

            txt = `# Subject
            Coding Boot Camp - Tutorial Confirmation - ${emailDate}
                        
            # Email_Body
            Hi ${data.firstName}!
                
            Thank you for scheduling your session with me. I am looking forward to our session on ${emailDate}.`
        }

        console.log('\x1b[36m%s\x1b[0m', `Student: ${data.firstName} ${data.lastName}`,)
        console.log(textColor, `Student's Session Date and Time: ${emailDate}`)
        console.log('\x1b[36m%s\x1b[0m', `Time Zone: ${data.timeZone}`)
        console.log('\x1b[36m%s\x1b[0m', `Time Zone Difference: ${timeZoneDiff} hr`)
    } else {
        // Adjust hour for student's time zone
        if (data.timeZone === 'PST') {
            timeZoneDiff = -1
            timeZoneDiff = `${timeZoneDiff}hr`
        } else if (data.timeZone === 'PDT' || data.timeZone === 'MST') {
            timeZoneDiff = 0
            timeZoneDiff = `+${timeZoneDiff}hr`
        } else if (data.timeZone === 'MDT' || data.timeZone === 'CST') {
            timeZoneDiff = 1
            timeZoneDiff = `+${timeZoneDiff}hr`
        } else if (data.timeZone === 'CDT' || data.timeZone === 'EST') {
            timeZoneDiff = 2
            timeZoneDiff = `+${timeZoneDiff}hr`
        } else if (data.timeZone === 'EDT') {
            timeZoneDiff = 3
            timeZoneDiff = `+${timeZoneDiff}hr`
        } else if (data.timeZone === 'AEST') {
            timeZoneDiff = 17
            timeZoneDiff = `+${timeZoneDiff}hr`
        }

        txt = `# SLACK
Please fill out the evaluation form at the link below:
${linksArray[0].studentForm}
Your class code is: ${data.classCode}
Have a great week!

# GOOGLE SHEETS
=SPLIT("${data.classCode},${data.gradDate},${data.firstName} ${data.lastName},${data.email},${today},${timeZoneDiff}", ",")

# TUTOR EVALUATION FORM
${linksArray[0].tutorForm}
${data.classCode}
${data.lastName}, ${data.firstName}
${data.email}
Creer, Spencer

# CLOCK-OUT NOTES
${data.classCode}
${data.firstName} ${data.lastName}
B2B-No
`
    }
    return txt
}

module.exports = generateTxt