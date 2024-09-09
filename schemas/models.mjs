
import mongoose, { mongo } from "mongoose"
import guildSchema from "./guild.mjs"
import anniversarySchema from "./anniversary.mjs"

const GuildModel = mongoose.model("Guilds", guildSchema)
const AnniversaryModel = mongoose.model("Anniversaries", anniversarySchema)

export {
    GuildModel,
    AnniversaryModel
}