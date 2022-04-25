// import { message } from "antd";

export const getRandomEmoji = () => {
    const emojis = [0x1F600, 0x1F604, 0x1F609, 0x1F929, 0x1F92A, 0x1F920, 0x1F973, 0x1F60E, 0x1F9D0, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355, 0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA, 0x1F431, 0x1F42A, 0x1F439, 0x1F424];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    return String.fromCodePoint(emoji)
}

export const getEmailTemplate = (name, date, timeZone) => {
    return `Hi ${name}!

Thank you for scheduling your session with me. I am looking forward to our session on ${date} ${timeZone}.
`
}

export const getEmailSubject = (date, timeZone) => {
    return `Coding Boot Camp - Tutorial Confirmation - ${date} ${timeZone}`
}

export const getSlackMessage = (classCode) => {
    return `Please fill out the evaluation form at the link below:
https://docs.google.com/a/trilogyed.com/forms/d/e/1FAIpQLSdb4ejjbqoqKO-Q4k7zeO_xwykwB0dxYLWYm1mX5Ik45MzEeg/viewform
    
Your class code is: ${classCode}`
}

// export const getGoogleSheet = () => {
//     return `=SPLIT('${class_code},${gradDate.formatted},${first_name} ${last_name},${email},${today.formatted},+${diff}hr,${clockIn.formatted},${clockOut.formatted},Yes, ${B2B},Yes, ${SHOW},${topics},${notes},Yes', ',')`
// }

export const getClockOutNotes = (class_code, first_name, last_name, B2B, show) => {
    return `${class_code}
${first_name} ${last_name}
B2B-${B2B}
${!show && 'No Show'}`
}

// export const copySessionValues = () => {
//     navigator.clipboard.writeText(`=SPLIT('${class_code},${gradDate.formatted},${first_name} ${last_name},${email},${today.formatted},+${diff}hr,${clockIn.formatted},${clockOut.formatted},Yes, ${B2B},Yes, ${SHOW},${topics},${notes},Yes', ',')`)
//     .then(() => message.success(`Google sheets row copied! ` + getRandomEmoji(), .7))
//     .then(() => navigator.clipboard.writeText(getClockOutNotes(class_code, first_name, last_name, B2B, show)))
//     .then(() => message.success('Clock-out notes copied! ' + getRandomEmoji(), .7))
//     .then(() => message.loading('Opening Form', 1))
// //Clock in and out

//     // .then(() => window.open(`https://docs.google.com/forms/d/e/1FAIpQLSc_q0CSp5Bpn7lfDAdoPCbBTW-OxWQVhC3gG5P9e6iE4FERjw/viewform?entry.1626809215=${class_code}&entry.1262798942=${last_name}, ${first_name}&entry.1509111758=${email}&entry.1450620354=No&entry.758887222=Creer, Spencer&entry.1572772860=Yes&entry.568333504=FSF - Full Stack Flex Web Development(Javascript)&entry.1311659485=${B2B}&entry.401287639=${today.formatted}&entry.781752343_hour=21&entry.781752343_minute=30&entry.721200944_hour=22&entry.721200944_minute=04&entry.1394734474=No&entry.2041303987=${topics}&entry.790082012=I am not a TA in this student's class&entry.2075286046=5&entry.1836903312=No mention of it at all.&entry.2058615286=${notes}`, 'noreferrer'))

// }