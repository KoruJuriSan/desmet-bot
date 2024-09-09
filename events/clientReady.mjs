import { Client, TextChannel, userMention } from "discord.js"
import { GuildModel, AnniversaryModel } from "../schemas/models.mjs"
import { CronJob } from "cron"
import dayjs from "dayjs"

/**
 * 
 * @param {Client<true>} client 
 */
export default async function clientReady(client) {

    console.log(`Client connected as ${client.user.tag}!`)

    if (!client.isDbConnected) return
    console.log("Updating guilds in Database...")

    try {

        const guilds = await client.guilds.fetch()
        let guildIdsDB = (await GuildModel.find({}, {guild_id: 1, _id: 0})).map( guild => guild.guild_id ?? "")

        // Add a guild to the DB when the bot has joined a new server
        for (const guild of guilds) {
            const guildID = guild[0]

            if (!(guildIdsDB.includes(guildID))) {

                console.log(`-> Adding ${guild} to the DB`)

                const newGuild = new GuildModel({
                    guild_id: guildID,
                })

                await newGuild.save()
            }
        }

        // Delete a guild from the DB when the bot no more in a server
        for (const guildID of guildIdsDB) {

            if (!(guilds.map(guild => guild.id).includes(guildID))) {

                console.log(`-> Removing the guild with this id ${guildID} from the DB`)

                await GuildModel.findOneAndDelete({guild_id: guildID})
            }
        }

        console.log("Database has been updated with success.")

    } catch(err) {
        console.log("Couldn't Update guilds in Database:")
        console.error(er)
    }

    const today = dayjs(`2024-${dayjs().format("MM-DD")}`, "MM-DD-YYYY").toDate()
    const query = {date: today}

    const anniversaryCron = new CronJob(
        "0 8 * * *",
        async () => {
            let anniversaries = await AnniversaryModel.find(query)
            
            let guilds = {}

            for (let anniv of anniversaries) {

                try {

                const guild = await client.guilds.fetch(anniv.guild_id)
                const member = await guild.members.fetch(anniv.user_id)
                const channelId = (await GuildModel.findOne({guild_id: anniv.guild_id}, {anniversary_channel: 1, _id: -1})).anniversary_channel
                const channel = await guild.channels.fetch(channelId)

                if (!(!guild && !member && !channel)) {

                    if (Object.keys(guilds).includes(anniv.guild_id)) {
                        guilds[anniv.guild_id].members.push(member)
                    } else {
                        guilds[anniv.guild_id] = {guild: guild, channel: channel, members: [member]}
                    }

                }


                } catch(err) {console.error(err)}
            }

            guilds = Object.entries(guilds)

            for (let [guild_id, {guild, channel, members}] of guilds) {

                try {

                    const mentions = members.map(member => userMention(member.id)).join(", ")
                    const message = `||@everyone|| Tous le monde souhaite un joyeux anniversaire a ${mentions}`

                    if (channel instanceof TextChannel) {
                        await channel.send({
                            content: message
                        })
                    }

                } catch(err) {
                    console.error(err)
                }
            }
        },
        null,
        true
    )
}