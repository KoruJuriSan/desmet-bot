const { Client, GatewayIntentBits} = require("discord.js")
const dotenv = require("dotenv")
const commandsHandler = require("./handlers/commandsHandler")
const buttonsHandler = require("./handlers/buttonsHandler")
const interactionCreate = require("./events/interactionCreate")
const ready = require("./events/ready")

dotenv.config()
const TOKEN = process.env.TOKEN

const client = new Client({ intents: GatewayIntentBits.GuildMembers})

commandsHandler(client)
buttonsHandler(client)

client.on("ready", async () => {
    ready(client)
})

client.on("interactionCreate", async interaction => {
    interactionCreate(interaction, client)
})

client.login(TOKEN)