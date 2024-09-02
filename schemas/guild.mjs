import { Schema } from "mongoose"

const guildsSchema = new Schema({
    guild_id: {type: String, require: true, unique: true},
    ticket_channel: String,
    ticket_response_channel: String,
    welcomme_channel: String,
})

export default guildsSchema