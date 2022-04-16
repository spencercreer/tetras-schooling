import moment from 'moment'

export const convertDate = (date, format) => {
    const convertedDate = new Date(parseInt(date))
    const past = convertedDate < Date.now()
    const formatted = moment(convertedDate).format(format)
    return { convertedDate, formatted, past }
}

export const getStudentsTime = (time_zone) => {
    let currentTime = new Date()
    let timeZone
    switch (time_zone) {
        case 'Pacific Time':
            timeZone = 'America/Los_Angeles'
            break;
        case 'Arizona Time':
            timeZone = 'America/Phoenix'
            break;
        case 'Mountain Time':
            timeZone = 'America/Denver'
            break;
        case 'Central Time':
            timeZone = 'America/Chicago'
            break;
        case 'Eastern Time':
            timeZone = 'America/New_York'
            break;
        default:
            timeZone = 'America/New_York'
            break;
    }
    currentTime = currentTime.toLocaleString('en-US', { timeZone })
    currentTime = moment(currentTime).format('MM/DD/YYYY, h:mm a')
    return currentTime
}

export const getRandomEmoji = () => {
    const emojis = [0x1F600, 0x1F604, 0x1F609, 0x1F929, 0x1F92A, 0x1F920, 0x1F973, 0x1F60E, 0x1F9D0, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355, 0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA, 0x1F431, 0x1F42A, 0x1F439, 0x1F424];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    return String.fromCodePoint(emoji)
}

export const getEmailTemplate = (name, date) => {
    return `Hi ${name}!

Thank you for scheduling your session with me. I am looking forward to our session on ${date}.
`
}

export const getEmailSubject = (date, timeZone) => {
    return `Coding Boot Camp - Tutorial Confirmation - ${date} ${timeZone}`
}