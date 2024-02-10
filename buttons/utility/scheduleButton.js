const dayjs = require("dayjs")
const { EmbedBuilder, ButtonBuilder } = require("discord.js")
const dotenv = require("dotenv")
const IcsHeH = require("../../classes/IcsHeH")
const couldBeInteger = require("../../lib/couldBeInteger")

daysValue = {
    yesterday: -1,
    today: 0,
    tomorrow: 1,
    aftertomorrow: 2,
    inthreedays: 3
}

daysFrenchText = {
    "-1": "Hier",
    "0": "Aujourd'hui",
    "1": "Demain",
    "2": "Après-Demain",
    "3": "Surlendemain"
}

daysOfTheWeekFrenchText = [
    "Dimanche", "Lundi", "Mardi", 
    "Mercredi", "Jeudi", "Vendredi",
    "Samedi",
]

module.exports = {
    name: "schedule",
    create(label, style, group, day_offset) {
        return new ButtonBuilder()
            .setCustomId(`schedule#day:${day_offset},group:${group}`)
            .setLabel(label)
            .setStyle(style)
    },

    async execute(interaction, client, args) {
        dotenv.config()
        const ICALURL = process.env.ICALURL

        let day_offset = 0
        if (couldBeInteger(args.day)) {
            day_offset = parseInt(args.day)
        }

        const group = args.group ?? "1"
        const day_start = dayjs().add(day_offset, "day").startOf("day")
        const day_end = dayjs().add(day_offset, "day").endOf("day")
        const dayOfTheWeekText = daysOfTheWeekFrenchText[dayjs().add(day_offset, "day").day()]
        const dateText = day_start.format("DD/MM/YYYY")
        let schedule = await new IcsHeH(ICALURL).getCourses(day_start, day_end)
        schedule = schedule.filter((course) => course.group == "common" || course.group == group)
        schedule.sort((e1, e2) => e1.date.start.isBefore(e2.date.start) ? -1 : 1)

        const embed = new EmbedBuilder()
            .setTitle(`Horraire: ${daysFrenchText[String(day_offset)]} - ${dayOfTheWeekText} ${dateText}`)
            .setURL(ICALURL)
            .setDescription(`Horraire des cours de l'option pour le **Groupe ${group}**`)
            .addFields(...schedule.map(course => {
                startHourText = course.date.start.format("HH:mm")
                endHoursText = course.date.end.format("HH:mm")
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