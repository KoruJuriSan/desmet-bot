import { Schema } from "mongoose"

const anniversarySchema = new Schema({
    guild_id: {type: String, required: true, unique: true},
    date: Date,
    user_id: String
})

export default anniversarySchema