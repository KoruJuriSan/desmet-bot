import axios from "npm:axios"
// @deno-types="npm:@types/ical"
import ical from "npm:ical"
import dayjs from "npm:dayjs"

export default class IcsHeH {
    url;

    constructor(url) {
        this.url = url
    }


    async requestIcs() {
        const res = await axios({
            method: "GET",
            url: this.url
        })
        const data = res.data
    
        const ics_data = ical.parseICS(data)
        return ics_data
    }


    treatCrouse(event, event_start, event_end) {
        const location = event?.location?.val ?? "Don't know where"

        let description = event?.description?.val

        if (description == undefined) {
            description = event?.summary?.val ?? "No subject"
        }

        let group = "common"
        if (description.includes("Groupe")) {
            group = description.split("Groupe ")[1][0]
        }

        let subject = description
        if (description.includes("Matière")) {
            subject = description.split("\n").find(val => {
                return val.includes("Matière")
            }).split(" : ")[1]
        }

        let teacher = "No teacher"
        if (description.includes("Enseignant")) {
            teacher = description.split("\n").find(val => {
                return val.includes("Enseignant")
            }).split(" : ")[1]
        }

        const canceled = description.includes("Annulation")

        return {
            "subject": subject, "teacher": teacher,
            "room": location, "group": group,
            "date": { "start": event_start, "end": event_end },
            "canceled": canceled
        }
    }


    sortCourses(courses) {
        const sortedCourses = courses
        courses.sort((e1, e2) => {
            return e1.date.start.isBefore(e2.date.start) ? -1 : 1
        })
        return sortedCourses
    }


    async getCourses(from_period, to_period) {
        const ics = await this.requestIcs(this.url)
        let courses = new Array(Object.keys(ics).length)
        let increment = 0
        for (const k in ics) {
            const event = ics[k]

            if (
                event.start != undefined &&
                event.end != undefined) {
            
                const [event_start, event_end] = [dayjs(event.start), dayjs(event.end)]
                if (
                    event_end.isAfter(from_period) &&
                    event_start.isBefore(to_period)) {

                    courses[increment] = this.treatCrouse(event, event_start, event_end)
                }
            }
            increment++
        }

        if (courses == []) {
            courses = {
                "subject": "Nothing for today", "teacher": "No teacher.",
                "room": "No location.", "group": "common",
                "date": { "start": dayjs().startOf("day"), "end": dayjs().endOf("day") }
            }
        }
        
        return this.sortCourses(courses)
    }


    async getCoursesOfGroup(from_period, to_period, group) {
        const courses = await this.getCourses(from_period, to_period)
        const  filteredCourses = courses.filter((course) => {
            return (course.group == "common" || course.group == group) && !course.canceled
        })
        return filteredCourses
    }
}