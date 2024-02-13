import dayjs from "npm:dayjs"
import { EmbedBuilder, ButtonBuilder } from "npm:discord.js"
import IcsHeH from "../../classes/IcsHeH.js"
import couldBeInteger from "../../lib/couldBeInteger.js"
import computeStartAndEndOfADay from "../../lib/computeStartAndEndOfADay.js"
import getEnv from "../../lib/getEnv.js"

const daysFrenchText = {
    "-1": "Hier",
    "0": "Aujourd'hui",
    "1": "Demain",
    "2": "Après-Demain",
    "3": "Surlendemain"
}

const daysOfTheWeekFrenchText = [
    "Dimanche", "Lundi", "Mardi", 
    "Mercredi", "Jeudi", "Vendredi",
    "Samedi",
]

export default {
    name: "schedule",
    create(label, style, group, day_offset) {
        return new ButtonBuilder()
            .setCustomId(`schedule#day:${day_offset},group:${group}`)
            .setLabel(label)
            .setStyle(style)
    },

    async execute(interaction, client, args) {
        // getting Ical url from .env file
        const env = await getEnv()
        const ICALURL = env["ICALURL"]

        // treating args from the button
        let day_offset = 0
        if (couldBeInteger(args.day)) {
            day_offset = parseInt(args.day)
        }

        const group = args.group ?? "1"

        // Compute the start and end times of the chosen day
        const choosen_day = dayjs().add(day_offset, "day")
        const [day_start, day_end] = computeStartAndEndOfADay(choosen_day)

        // Some textes for the embed
        const dayOfTheWeekText = daysOfTheWeekFrenchText[dayjs().add(day_offset, "day").day()]
        const dateText = day_start.format("DD/MM/YYYY")

        // Schedule from the online ics.
        let schedule = await new IcsHeH(ICALURL)
            .getCoursesOfGroup(day_start, day_end, group)

        // Embed of the course schedule that the user requested.
        const embed = new EmbedBuilder()
            .setTitle(`Horraire: ${daysFrenchText[String(day_offset)]} - ${dayOfTheWeekText} ${dateText}`)
            .setURL(ICALURL)
            .setDescription(`Horraire des cours de l'option pour le **Groupe ${group}**`)
            .addFields(...schedule.map(course => {
                const startHourText = course.date.start.format("HH:mm")
                const endHoursText = course.date.end.format("HH:mm")
                return {
                    name: `__${course.subject} ${course.group == "common" ? "" : `(Gr${group})` }__`,
                    value: `⏲ ${startHourText} - ${endHoursText}\n☛ ${course.room} ☚\n> ${course.teacher}`,
                    inline: false
                }
            }))
            .setColor("#8fbc8f")
            .setFooter({
                text: "Si vous avez une idée pour améliorer le bot => #desmet-bot",
                iconURL: client.user.avatarURL()
            })

        // Bot's response to the button interaction
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
}