import { Client } from "discord.js"
import { GuildModel } from "../schemas/models.mjs"

/**
 * 
 * @param {Client<true>} client 
 */
export default async function clientReady(client) {

    console.log(`Client connected as ${client.user.tag}!`)
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
}