const { Client, GatewayIntentBits} = require("discord.js")
const dotenv = require("dotenv")

dotenv.config()
const TOKEN = process.env.TOKEN

const client = new Client({ intents: GatewayIntentBits.GuildMembers})

client.on("ready", () => {
    console.log(`Client logged in as ${client.user.tag}`)
})

client.login(TOKEN)