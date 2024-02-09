const dayjs = require("dayjs")
const requestIcsFromUrl = require("../../scripts/requestIcsFromUrl")
const { EmbedBuilder, ButtonBuilder } = require("discord.js")
const dotenv = require("dotenv")
const hehIcalTreatment = require("../../scripts/hehIcalTreatment")

daysValue = {
    yesterday: -1,
    today: 0,
    tomorrow: 1,
    aftertomorrow: 2,
    inthreedays: 3
}

daysFrenchText = {
    yesterday: "Hier",
    today: "Aujourd'hui",
    tomorrow: "Demain",
    aftertomorrow: "Après-Demain",
    inthreedays: "Surlendemain"
}

daysOfTheWeekFrenchText = [
    "Dimanche", "Lundi", "Mardi", 
    "Mercredi", "Jeudi", "Vendredi",
    "Samedi",
]

module.exports = {
    name: "schedule",

    async create(label, style, group, day_offset) {
        return new ButtonBuilder()
            .setCustomId(`schedule#day:${day_offset},group:${group}`)
            .setLabel(label)
            .setStyle(style)
    },

    async execute(interaction, client, args) {
        dotenv.config()
        const ICALURL = process.env.ICALURL

        const day = args.day ?? "today"
        const dayValue = daysValue[day]
        const group = args.group ?? "1"
        const day_start = dayjs().add(dayValue, "day").startOf("day")
        const day_end = dayjs().add(dayValue, "day").endOf("day")
        const dayOfTheWeekText = daysOfTheWeekFrenchText[dayjs().add(dayValue, "day").day()]
        const dateText = day_start.format("DD/MM/YYYY")
        let schedule = hehIcalTreatment( await requestIcsFromUrl(ICALURL), day_start, day_end)
        schedule = schedule.filter((course) => course.group == "common" || course.group == group)
        schedule.sort((e1, e2) => e1.date.start.isBefore(e2.date.start) ? -1 : 1)

        const embed = new EmbedBuilder()
            .setTitle(`Horraire: ${daysFrenchText[day]} - ${dayOfTheWeekText} ${dateText}`)
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
            .setColor("#00b0f4")
            .setFooter({
                text: "If you have any idea > #desmet-bot",
                iconURL: ICALURL,
            });

        interaction.reply({
            embeds: [embed]
        })
    }
}