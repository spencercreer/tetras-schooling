const moment = require('moment')
const fs = require('fs')

var links = fs.readFileSync('_links.txt', 'utf8')
var linksArray = links.split('\r\n')
linksArray = linksArray.map(i => JSON.parse(i))

function generateTxt(data) {
    var day = moment().format('L')
    var txt
    var timeZoneDiff
    if (data.init === 'Email confirmation') {
        let hour = parseInt(data.time.split(':')[0])
        let minute = data.time.split(':')[1]
        let meridiem
        // Adjust hour for student's time zone
        if (data.timeZone === 'Mountain Time') {
            timeZoneDiff = 1
            hour += timeZoneDiff
            console.log(hour + ':' + minute)
            timeZoneDiff = `+${timeZoneDiff}hr`
            console.log(timeZoneDiff)
        } else if (data.timeZone === 'Central Time') {
            timeZoneDiff = 2
            hour += timeZoneDiff
            console.log(hour + ':' + minute)
            timeZoneDiff = `+${timeZoneDiff}hr`
            console.log(timeZoneDiff)
        } else if (data.timeZone === 'Eastern Time') {
            timeZoneDiff = 3
            hour += timeZoneDiff
            console.log(hour + ':' + minute)
            timeZoneDiff = `+${timeZoneDiff}hr`
            console.log(timeZoneDiff)
        }

        // Convert military time to am/pm time
        if (hour > 12) {
            hour -= 12
            meridiem = 'pm'
        } else if (hour === 12) {
            meridiem = 'pm'
        } else {
            meridiem = 'am'
        }

        txt = `# Subject
Coding Boot Camp - Tutorial Confirmation - ${data.date}, ${hour}:${minute}${meridiem} ${data.timeZone}
            
# Email_Body
Hi ${data.firstName}!
    
Thank you for scheduling your session with me. I am looking forward to our session on ${data.date}, ${hour}:${minute}${meridiem} ${data.timeZone}.`
    } else {
        // Adjust hour for student's time zone
        if (data.timeZone === 'Mountain Time') {
            timeZoneDiff = 1
            timeZoneDiff = `+${timeZoneDiff}hr`
        } else if (data.timeZone === 'Central Time') {
            timeZoneDiff = 2
            timeZoneDiff = `+${timeZoneDiff}hr`
        } else if (data.timeZone === 'Eastern Time') {
            timeZoneDiff = 3
            timeZoneDiff = `+${timeZoneDiff}hr`
        }

        txt = `# SLACK
Please fill out the evaluation form at the link below:
${linksArray[0].studentForm}
Your class code is: ${data.classCode}
Have a great week!

# GOOGLE SHEETS
=SPLIT("${data.classCode},${data.gradDate},${data.firstName} ${data.lastName},${data.email},${day},${timeZoneDiff}", ",")

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