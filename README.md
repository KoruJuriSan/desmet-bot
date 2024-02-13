# Desmet-bot

## Description
A Discord bot for our Discord server at HEH. For now, it's capable of fetching the course schedule and responding to a ping command, but with your help, I'm sure we'll be able to create the ultimate Discord bot.

## Local Installation

- Prerequisites: 
    - Have [Deno](https://docs.deno.com/runtime/manual) v1.40.4 or later installed. The bot might work with an older version, but at your own risk.
    - Have a [discord application](https://discord.com/developers/docs/getting-started#step-1-creating-an-app)

1. Clone the repo:
```bash
git clone https://github.com/KoruJuriSan/desmet-bot.git
```

2. create a .env with the .env-example entry, then add your own data.
    - TOKEN: Your Discord bot token
    - CLIENTID: Your Discord bot ID
    - GUILDID: Test guild ID (optional)
    - ICALURL:  URL of the schedule (WARNING, the bot was designed for HEH schedules!)


## How to use

start the bot. (without command registering)
```bash
deno task start
```
---

register commands
```bash
deno task refresh
```
---

start the bot in dev mode (need GUILDID in .env)
```bash
deno task dev
```

## Uninstall service (server)

- to remove the service, you just have to run this command:
```bash
deno task remove-service
```


## Install service (server)

- Prerequisites: 
    - You should have done the [Local Installation](#local-installation)


- Create the service with the command below:
```bash
deno task create-service
```

## 📝 License

This project is under [MIT](LICENCE.md) Licence. <br>
Copyright © 2024 [Colle Joulian](https://github.com/KoruJuriSan)
