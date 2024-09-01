import createAnnonce from "./admin/createAnnonce.mjs"
import whoami from "./user/whoami.mjs"
import ping from "./user/ping.mjs"
import ipInfo from "./user/ipInfo.mjs"

const commands = [
    createAnnonce,
    whoami,
    ping,
    ipInfo
]

export default commands