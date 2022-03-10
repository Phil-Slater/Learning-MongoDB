const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getDate() {
    const dateString = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    const date = new Date(dateString)
    const finalDate = `${daysOfWeek[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

    return finalDate
}

module.exports = getDate;
