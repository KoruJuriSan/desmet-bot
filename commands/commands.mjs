import createAnnonce from "./admin/createAnnonce.mjs"
import whoami from "./user/whoami.mjs"
import ping from "./user/ping.mjs"
import ipInfo from "./user/ipInfo.mjs"
import binaryOperation from "./user/binaryOperation.mjs"

const commands = [
    createAnnonce,
    whoami,
    ping,
    ipInfo,
    binaryOperation
]

export default commands