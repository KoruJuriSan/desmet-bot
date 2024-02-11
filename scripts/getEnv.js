import { load } from "https://deno.land/std@0.215.0/dotenv/mod.ts"

export default async function getEnv() {
    const env = await load()
    return env
}