# Desmet-bot

## Description
A Discord bot for our Discord server at HEH. Desmet-chan handles ticketing, role management for class groups, it can store data like birthdate in its Own DB and much more.

## Local Installation

- Prerequisites: 
    - Have [pnpm](https://pnpm.io/installation) v9.10.0 or later installed.
    - Have [node](https://nodejs.org/en/download/package-manager) v20.17.0 or later installed.
    - Have a [discord application](https://discord.com/developers/docs/getting-started#step-1-creating-an-app)
    - Have [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/) installed and running

1. Clone the repo:
```bash
git clone https://github.com/KoruJuriSan/desmet-bot.git
```

2. run `pnpm install` to install all the dependencies.

3. create a .env with the .env-example entry, then add your own data.
    - TOKEN: Your Discord bot token
    - CLIENTID: Your Discord bot ID
    - GUILDID: Test guild ID (only for dev)



## How to use

To start the bot, run

```bash
pnpm run refresh
pnpm start
```

Or to run in dev mode
```bash
pnpm run dev
```

## 📝 License

This project is under [MIT](LICENCE.md) Licence. <br>
Copyright © 2024 [Colle Joulian](https://github.com/KoruJuriSan)
