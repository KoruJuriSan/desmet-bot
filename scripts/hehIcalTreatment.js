const dayjs = require("dayjs")

module.exports = function hehIcalTreatment(ics, from_perido, to_period) {
    courses = new Array(Object.keys(ics).length)
    increment = 0
    for (const k in ics) {
        const event = ics[k]
        if (event.start != undefined && event.end != undefined) {
            const [event_start, event_end] = [dayjs(event.start), dayjs(event.end)]
            if(event_end.isAfter(from_perido) && event_start.isBefore(to_period)) {
                room = event?.location?.val ?? "Don't know where"
                description = event?.description?.val ?? "No value"
                fallBackSummary = event?.summary?.val ?? "No subject"
                group = description.includes("Groupe") ? description.split("Groupe ")[1][0] : "common"
                subject = description.includes("Matière") ? description.split("\n").find(val => val.includes("Matière")).split(" : ")[1] : fallBackSummary
                teacher = description.includes("Enseignant") ? description.split("\n").find(val => val.includes("Enseignant")).split(" : ")[1] : "no teacher"
                courses[increment] = {
                    "subject": subject,
                    "teacher": teacher,
                    "room": room,
                    "group": group,
                    "date": {
                        "start": event_start,
                        "end": event_end
                    }
                }
            }
        }
        increment++
    }
    return courses
}