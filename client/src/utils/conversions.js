const convertGradDate = (grad_date) => {
    let gradDate = new Date(parseInt(grad_date))
    const graduated = gradDate < Date.now()
    gradDate = gradDate.toLocaleString().split(",")[0]
    return { gradDate, graduated }
}

module.exports = convertGradDate