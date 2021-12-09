// have date field auto-populate with tomorrows date

document.getElementById("submitBtn").addEventListener("click", function () {
    let name = document.getElementById("name").value
    let session = convertTime()
    console.log(session)

    document.getElementById("email-subject").value = `Coding Boot Camp - Tutorial Confirmation - ${session}`

    document.getElementById("email-text").value = `Hi ${name}!
                
    Thank you for scheduling your session with me. I am looking forward to our session on ${session}.`

    copySubject()
    // remove the link to gmail from submit button and move to a link next to it
})

function formatDate() {

}

function convertTime() {
    let timeZone = document.getElementById("time-zone").value
    let date = document.getElementById("date").value
    let hour = document.getElementById("hour").value
    let minute = document.getElementById("minute").value
    let meridiem = document.getElementById("meridiem").value
    let time = `${hour}:${minute} ${meridiem}`

    let timeZoneDiff
    // Determine hour difference based on student's time zone
    if (timeZone === 'PST') {
        timeZoneDiff = -1
    } else if (timeZone === 'PDT' || timeZone === 'MST') {
        timeZoneDiff = 0
    } else if (timeZone === 'MDT' || timeZone === 'CST') {
        timeZoneDiff = 1
    } else if (timeZone === 'CDT' || timeZone === 'EST') {
        timeZoneDiff = 2
    } else if (timeZone === 'EDT') {
        timeZoneDiff = 3
    } else if (timeZone === 'AEST') {
        timeZoneDiff = 18
    }

    date = moment(`${date} ${time}`).add(timeZoneDiff, 'hours').format('llll')
    return date
}

function copySubject() {
    /* Get the text field */
    let copyText = document.getElementById("email-subject");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}

function copyEmail() {
    let copyText = document.getElementById("email-text");

    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    navigator.clipboard.writeText(copyText.value);

    alert("Copied the text: " + copyText.value);
}