import { SlashCommandBuilder, EmbedBuilder } from "npm:discord.js"
import { isBinary, isDecimal, isHexadecimal, isOctal } from "../../lib/baseVerification.js"

export default {
    data: new SlashCommandBuilder()
        .setName("convert-base")
        .setDescription("Permet de réaliser des conversions de base mathématique (binaire, octale, décimale, hexadécimale).")
        .addStringOption(option => 
            option
                .setName("from")
                .setDescription("La base d'origine.")
                .setRequired(true)
                .addChoices(
                {name: "binaire", value: "2"},
                {name: "octal", value: "8"},
                {name: "décimale", value: "10"},
                {name: "hexadécimale", value: "16"}
        ))
        .addStringOption(option => 
            option
                .setName("to")
                .setDescription("La base de la réponse.")
                .setRequired(true)
                .addChoices(
                {name: "binaire", value: "2"},
                {name: "octal", value: "8"},
                {name: "décimale", value: "10"},
                {name: "hexadécimale", value: "16"}
        ))
        .addStringOption(option => 
            option
                .setName("nombre")
                .setDescription("le nombre a changer de base.")
                .setRequired(true)
        )
        .addBooleanOption(option => 
            option
                .setName("ephemeral")
                .setDescription("est-ce que le message doit-etre invisible pour les autre utilisateurs ou non ?")
        ),

    async execute(interaction) {
        const bot = interaction.client.user
        const args = interaction.options
        const fromBase = parseInt(args.getString("from"))
        const toBase = parseInt(args.getString("to"))
        const numberString = args.getString("nombre")
        const isEphemeral = args.getBoolean("ephemeral") ?? true

        let  isCorrectNumber = false
        
        switch (fromBase) {
            case 2:
                isCorrectNumber = isBinary(numberString)
                break

            case 8:
                isCorrectNumber = isOctal(numberString)
                break
            
            case 10:
                isCorrectNumber = isDecimal(numberString)
                break

            case 16:
                isCorrectNumber = isHexadecimal(numberString)
                break
        }

        if (isCorrectNumber) {
            const number = parseInt(numberString, fromBase)
            const answer = number.toString(toBase)

            const embed = new EmbedBuilder()
                .setAuthor({
                    name: bot.displayName,
                    iconURL: bot.displayAvatarURL(),
                })
                .setTitle("Conversion de base.")
                .setDescription(`Nombre d'origine  en base ${fromBase}\n\`\`\`( ${numberString} )_${fromBase}\`\`\`\n\nConversion en base ${toBase}\n\`\`\`( ${answer} )_${toBase}\`\`\``)
                .setColor("#8fbc8f")

            await interaction.reply({
                embeds: [embed],
                ephemeral: isEphemeral
            })
        } else {
            interaction.reply({
                content: `Le nombre donné (${numberString}) n'est pas en base ${fromBase}.`,
                ephemeral: true
            })
        }
    }
}