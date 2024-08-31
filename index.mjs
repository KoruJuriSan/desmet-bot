import { Client, Events, GatewayIntentBits } from "discord.js"
import mongoose from "mongoose"
import handleCommands from "./commands/handleCommands.mjs"
import dotenv from "dotenv"

dotenv.config()
const token = process.env.TOKEN

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]})

client.once(Events.ClientReady, (client) => {
    console.log(`Client connected as ${client.user.tag}!`)
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand) {
        await handleCommands(interaction)
    }
})

client.login(token)