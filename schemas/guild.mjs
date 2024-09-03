import { Schema } from "mongoose"

const guildSchema = new Schema({
    guild_id: {type: String, require: true, unique: true},
    ticket_channel: String,
    welcomme_channel: String,
})

export default guildSchema