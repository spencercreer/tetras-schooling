document.getElementById("submitBtn").addEventListener("click", function () {
    var name = document.getElementById("name").value
    var timeZone = document.getElementById("time-zone").value
    var date = document.getElementById("date").value
    var time = document.getElementById("time").value

    document.getElementById("email-subject").value = `Coding Boot Camp - Tutorial Confirmation - ${date} ${time} ${timeZone}`

    document.getElementById("email-text").value = `Hi ${name}!
                
    Thank you for scheduling your session with me. I am looking forward to our session on ${date} at ${time} ${timeZone}.`

    copySubject()
})

function copySubject() {
    /* Get the text field */
    var copyText = document.getElementById("email-subject");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}

function copyEmail() {
    var copyText = document.getElementById("email-text");

    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    navigator.clipboard.writeText(copyText.value);

    alert("Copied the text: " + copyText.value);
}