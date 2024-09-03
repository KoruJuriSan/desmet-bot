
import mongoose from "mongoose"
import guildSchema from "./guild.mjs"

const GuildModel = mongoose.model("Guilds", guildSchema)

export {
    GuildModel
}