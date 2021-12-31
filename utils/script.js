// have date field auto-populate with tomorrows date

$("#submitBtn").click(() => {
    let name = document.getElementById("name").value
    let session = convertTime()
    let timeZone = document.getElementById("time-zone").value

    document.getElementById("email-subject").value = `Coding Boot Camp - Tutorial Confirmation - ${session} ${timeZone}`

    $("#email-text").append(`<div style="padding: 20px 10vw">
  <p>Hi ${name}!</p>

  <p>Thank you for scheduling your session with me. I am looking forward to our session on <b>${session} ${timeZone}</b>.</p>

  <p>If something comes up and the scheduled time will not work, <b>let me know a minimum of 6 hours before the
      appointment time</b> and we&apos;ll figure something out.</p>

  <p>This session will take place here: https://us05web.zoom.us/j/5380280796?pwd=NWV5Q3YwZlBaS0l5V1ViVHpoUUxUZz09</p>

  <div style="padding-left: 2em;">(If you have not used zoom before please join the meeting at least 15 minutes early
    because it may have you download and install some software.)</div><br>

  Again, all I need from you:
  <ul>
    <li>Be on Tutors &amp; Students Slack 5 minutes before your time slot.</li>

    <li>Make sure your computer/mic/internet connection are working.</li>

    <li>Make sure your workspace is quiet and free from interruptions.</li>

    <li>At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to
      complete.</li>
  </ul>

  <p>Slack or email me with any questions. I&apos;m looking forward to our meeting!</p>

  <p><b>Please Reply All to this email so that I know you have seen it.</b></p>

  <p><b>(CC Central Support on all tutor email by always using REPLY ALL).</b></p>

  <p>Sincerely,<br>
    Spencer Creer</p>
</div>`)
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