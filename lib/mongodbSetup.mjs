import mongoose from "mongoose"

export default async function mongodbSetup() {
    let isDbConnected = false
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/desmet-chan-bot")
        isDbConnected = true
        console.log("Mongodb connected on 'desmet-chan-bot' DB")
    } catch(err) {
        console.log("Couldn't connect to Mongodb on 'desmet-chan-bot' DB:")
        console.error(err)
    }
    return isDbConnected
}