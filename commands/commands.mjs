import createAnnonce from "./admin/createAnnonce.mjs"
import whoami from "./user/whoami.mjs"
import ping from "./user/ping.mjs"
import ipInfo from "./user/ipInfo.mjs"
import binaryOperation from "./user/binaryOperation.mjs"
import convertBase from "./user/convertBase.mjs"
import info from "./user/info.mjs"
import setChannel from "./admin/SetChannel.mjs"

const commands = [
    createAnnonce,
    whoami,
    ping,
    ipInfo,
    binaryOperation,
    convertBase,
    info,
    setChannel
]

export default commands