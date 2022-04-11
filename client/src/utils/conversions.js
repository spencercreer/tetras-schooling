export const convertDate = (date) => {
    const convertedDate = new Date(parseInt(date))
    const past = convertedDate < Date.now()
    const formatted = convertedDate.toLocaleString().split(",")[0]
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
    console.log(currentTime, timeZone)
    return currentTime
}