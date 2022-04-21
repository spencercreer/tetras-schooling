import moment from 'moment'

export const convertDate = (date, format, diff) => {
    const convertedDate = new Date(parseInt(date))
    const past = convertedDate < Date.now()
    // TODO: adding diff likely made many of the values off
    const formatted = moment(convertedDate).add(diff, 'hours').format(format)
    return { convertedDate, formatted, past }
}

export const dateIsPast = (date) => {
    const parsedDate = new Date(parseInt(date))
    return parsedDate < Date.now()
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

export const formatTimeZone = (time_zone) => {
    let diff
    let location
    let long
    switch (time_zone) {
        case 'PT':
            location = 'America/Los_Angeles'
            // TODO: Make diff a calculation
            long = 'Pacific Time'
            diff = 0
            break;
        case 'MST':
            location = 'America/Phoenix'
            long = 'Arizona Time'
            diff = 0
            break;
        case 'MT':
            location = 'America/Denver'
            long = 'Mountain Time'
            diff = 1
            break;
        case 'CT':
            location = 'America/Chicago'
            long = 'Central Time'
            diff = 2
            break;
        case 'ET':
            location = 'America/New_York'
            long = 'Eastern Time'
            diff = 3
            break;
        default:
            location = 'America/New_York'
            long = 'Eastern Time'
            diff = 3
            break;
    }

    return { code: time_zone, long, location, diff }
}

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