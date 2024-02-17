import { SlashCommandBuilder, EmbedBuilder } from "npm:discord.js"
import dayjs from "npm:dayjs";

const github = "https://github.com/KoruJuriSan/desmet-bot"

export default {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Permet d'obtenir des informations à propos du bot (avatar, création, GitHub, ...)")
        .addBooleanOption(option => 
            option
                .setName("ephemeral")
                .setDescription("est-ce que le message doit-etre invisible pour les autre utilisateurs ou non ?")
        ),
    
    async execute(interaction) {

        const bot = interaction.client.user
        const args = interaction.options
        const isEphemeral = args.getBoolean("ephemeral") ?? true

        const embed = new EmbedBuilder()
            .setTitle("Informations")
            .setDescription(`Salut, c'est moi, ${bot.displayName}! Je suis née le \`${dayjs(bot.createdAt).format("DD/MM/YYYY")}\`\n\n Je suis présent dans \`${interaction.client.guilds.cache.size}\` serveurs.\n\n Tu peux aussi jeter un coup d'œil à mon [Github](${github}).\n Si tu veux apporter des améliorations, n'hésite pas à contribuer !\n`)
            .setThumbnail(bot.displayAvatarURL())
            .setColor("#8fbc8f")
            .setFooter({
                text: bot.displayName,
                iconURL: bot.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: isEphemeral })
    }
}