import { Collection } from "npm:discord.js"
import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts"
import MysqlTableBuilder from "../classes/MysqlTableBuilder.js"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import getEnv from "../lib/getEnv.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function tablesHandler(client) {

    const env = await getEnv()
    const DBHOST = env["DBHOST"] ?? "127.0.0.1"
    const DBUSER = env["DBUSER"] ?? "root"
    const DBNAME = env["DBNAME"] ?? "desmet_bot"
    const DBPASSWORD = env["DBPASSWORD"] ?? ""

    let loadedWithSucces = false
    let mysqlClient;

    try {
        mysqlClient = await new Client().connect({
            hostname: DBHOST,
            username: DBUSER,
            db: DBNAME,
            password: DBPASSWORD
        })
        loadedWithSucces = true
    } catch(err) {
        "[WARNING] Couldn't connect to the Mysql Database. error:"
        console.error(err)
    }

    client.tables = new Collection()

    if (loadedWithSucces) {
        const foldersPath = path.join(__dirname, "../",  "tables")
        const tableFolders = fs.readdirSync(foldersPath)

        console.log("------- Loading db tables --------")
        for (const folder of tableFolders) {
            const tablesPath = path.join(foldersPath, folder)
            const tableFiles = fs.readdirSync(tablesPath)
            for (const file of tableFiles) {
                const filePath = path.join(tablesPath, file)
                let {default: table} = await import(filePath)
                if (!(table instanceof MysqlTableBuilder)) {
                    console.log(`[WARNING] The table at ${filePath} should be an instance of MysqlTableBuilder!`)
                } else {
                    try {
                        table = await table.setClient(mysqlClient).setup()
                        client.tables.set(table.name, table)
                        console.log(`The table ${table.name} has been loaded with Success!`)
                    } catch(err) {
                        console.log(`[WARNING] The table at ${filePath} got an error during setup process, error:`)
                        console.error(err)
                    }
                }
            }
            console.log() // line break
        }
    }

}