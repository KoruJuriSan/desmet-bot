import { Client, Events, GatewayIntentBits } from "discord.js"
import mongoose from "mongoose"
import guildSchema from "./schemas/guild.mjs"
import handleCommands from "./commands/handleCommands.mjs"
import dotenv from "dotenv"

async function main() {

    dotenv.config()
    const token = process.env.TOKEN

    let isDbConnected = false
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/desmet-chan-bot")
        isDbConnected = true
        console.log("Mongodb connected on 'desmet-chan-bot' DB")
    } catch(err) {
        console.log("Couldn't connect to Mongodb on 'desmet-chan-bot' DB:")
        console.error(err)
    }

    const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]})

    client.once(Events.ClientReady, async (client) => {
        console.log(`Client connected as ${client.user.tag}!`)
        console.log("Updating guilds in Database...")
        try {
            const guilds = await client.guilds.fetch()
            const GuildModel = mongoose.model("Guilds", guildSchema)
            let guildIdsDB = (await GuildModel.find({}, {guild_id: 1, _id: 0})).map( guild => guild.guild_id ?? "")
    
            for (const guild of guilds) {
                if (!(guildIdsDB.includes(guild[0]))) {
                    console.log(`-> Adding ${guild} to the DB`)
                    const newGuild = new GuildModel({
                        guild_id: guild[0],
                    })
                    await newGuild.save()
                }
            }

            for (const guildId of guildIdsDB) {
                if (!(guilds.map(guild => guild.id).includes(guildId))) {
                    console.log(`-> Removing the guild with this id ${guildId} from the DB`)
                    await GuildModel.findOneAndDelete({guild_id: guildId})
                }
            }

            console.log("Database has been updated with success.")

        } catch(err) {
            console.log("Couldn't Update guilds in Database:")
            console.error(er)
        }
    })

    client.on(Events.InteractionCreate, async (interaction) => {
        if (interaction.isChatInputCommand) {
            await handleCommands(interaction)
        }
    })

    client.login(token)

}

main()