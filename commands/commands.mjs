// Import Admin commands
import createAnnonce from "./admin/createAnnonce.mjs"
import setChannel from "./admin/SetChannel.mjs"

// Import User commands
import whoami from "./user/whoami.mjs"
import ping from "./user/ping.mjs"
import ipInfo from "./user/ipInfo.mjs"
import binaryOperation from "./user/binaryOperation.mjs"
import convertBase from "./user/convertBase.mjs"
import info from "./user/info.mjs"
import anniversary from "./user/anniversary.mjs"
import ticket from "./user/ticket.mjs"

const commands = [
    // User commands
    whoami,
    ping,
    ipInfo,
    binaryOperation,
    convertBase,
    info,
    anniversary,
    ticket,

    // Admin commands
    createAnnonce,
    setChannel
]

export default commands