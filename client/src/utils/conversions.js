import moment from 'moment'

export const convertDate = (date, format, diff) => {
    const convertedDate = new Date(parseInt(date))
    const past = convertedDate < Date.now()
    // TODO: adding diff likely made many of the values off
    const formatted = moment(convertedDate).add(diff, 'hours').format(format)
    const hour = moment(convertedDate).hour()
    const minute = moment(convertedDate).minute()
    return { convertedDate, formatted, hour, minute, past }
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
