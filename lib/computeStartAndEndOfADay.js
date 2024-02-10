module.exports = function computeStartAndEndOfADay(day) {
    return [
        day.startOf("day"),
        day.endOf("day")
    ]
}