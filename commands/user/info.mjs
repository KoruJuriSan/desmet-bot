import Command from "../../classes/command.mjs"
import { EmbedBuilder } from "discord.js"
import dayjs from "dayjs"

const github = "https://github.com/KoruJuriSan/desmet-bot"

const info = new Command("info", "Permet d'obtenir des informations à propos du bot (avatar, création, GitHub, ...)")
    .setExecute( async (interaction) => {

        const bot = interaction.client.user
        const args = interaction.options
        const isEphemeral = args.getBoolean("invisible") ?? true

        const embed = new EmbedBuilder()
            .setTitle("Informations")
            .setDescription(`Salut, c'est moi, ${bot.displayName}! Je suis née le \`${dayjs(bot.createdAt).format("DD/MM/YYYY")}\`\n\n Je suis présente dans \`${interaction.client.guilds.cache.size}\` serveurs.\n\n Tu peux aussi jeter un coup d'œil à mon [Github](${github}).\n Si tu veux apporter des améliorations, n'hésite pas à contribuer! uwu~\n`)
            .setThumbnail(bot.displayAvatarURL())
            .setColor("#ff89f5")
            .setFooter({
                text: bot.displayName,
                iconURL: bot.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: isEphemeral })
    })

info.builder = info.builder
    .addBooleanOption(option => option
        .setName("invisible")
        .setDescription("Si le message doit être invisible pour les autres utilisateurs, oui par défaut.")
    )

export default info