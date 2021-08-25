function generateTxt(data) {
    let txt
    if(data.init === 'Email confirmation') {
        let hour = parseInt(data.time.split(':')[0])
        let minute = data.time.split(':')[1]
        let meridiem
        // Adjust hour for student's time zone
        if(data.timeZone === 'Mountain Time') {
            hour += 1
            console.log(hour + ':' + minute)
        } else if(data.timeZone === 'Central Time') {
            hour += 2
            console.log(hour + ':' + minute)
        } else if(data.timeZone === 'Eastern Time') {
            hour += 3
            console.log(hour + ':' + minute)
        }
    
        // Convert military time to am/pm time
        if(hour > 12) {
            hour -= 12
            meridiem = 'pm'
        } else if(hour === 12) {
            meridiem = 'pm'
        } else {
            meridiem = 'am'
        }
    
        txt = `# Subject
Coding Boot Camp - Tutorial Confirmation - ${data.date}, ${hour}:${minute}${meridiem} ${data.timeZone}
            
# Email_Body
Hi ${data.firstName}!
    
Thank you for scheduling your session with me. I am looking forward to our session on ${data.date}, ${hour}:${minute}${meridiem} ${data.timeZone}.`
    } else (
    txt = `Hello`
    )
    return txt
}

module.exports = generateTxt