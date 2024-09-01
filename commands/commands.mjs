import createAnnonce from "./admin/createAnnonce.mjs"
import whoami from "./user/whoami.mjs"
import ping from "./user/ping.mjs"

const commands = [
    createAnnonce,
    whoami,
    ping
]

export default commands