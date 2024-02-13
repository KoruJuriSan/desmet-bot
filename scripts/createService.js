import {
    generateConfig, 
    installService 
} from "https://deno.land/x/service@1.0.0-rc.0/lib/service.ts"
import * as path from "https://deno.land/std@0.207.0/path/mod.ts"
import username from "https://deno.land/x/username/mod.ts"

async function main() {
    const CWD = Deno.cwd()
    const indexjsPath = path.join(CWD, "index.js")
    const user = await username()

    const data = {
        system: false,
        name: "desmet-bot",
        user: user,
        cmd: `deno run --allow-env --allow-read --allow-net ${indexjsPath}`,
        cwd: CWD,
    }

    console.log("Start generating the configuration...")
    const config = await generateConfig(data)
    console.log(`configuration:\n\n${config}`)

    const confirmation = confirm("Should we proceed with this configuration ?")
    
    if (confirmation) {
        console.log("Start generating the service...")
        await installService(data)
        console.log("Service successfully generated !")
    } else {
        console.log("Process avorted.")
    }
    
}

main()