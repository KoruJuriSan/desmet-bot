import { uninstallService } from "https://deno.land/x/service@1.0.0-rc.0/lib/service.ts"

async function main() {
    await uninstallService({
        system: false,
        name: "desmet-bot",
    })
}

main()