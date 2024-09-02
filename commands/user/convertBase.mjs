import { isBinary, isDecimal, isOctal, isHexadecimal } from "../../lib/baseVerification.mjs"
import { EmbedBuilder } from "discord.js"
import Command from "../../classes/command.mjs"

const convertBase = new Command("convert-base", "Réalise des conversions de base mathématique (binaire, octale, décimale, hexadécimale)")
    .setExecute( async (interaction) => {
        const bot = interaction.client.user
        const args = interaction.options
        const fromBase = parseInt(args.getString("de"))
        const toBase = parseInt(args.getString("a"))
        const numberString = args.getString("nombre")
        const isEphemeral = args.getBoolean("invisible") ?? true

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
                .setColor("#ff89f5")

            await interaction.reply({
                embeds: [embed],
                ephemeral: isEphemeral
            })
        } else {
            interaction.reply({
                content: `Désolé senpai, mais le nombre donné (${numberString}) n'est pas en base ${fromBase}. :face_with_spiral_eyes:`,
                ephemeral: true
            })
        }
    })

convertBase.builder = convertBase.builder
    .addStringOption(option => 
        option
            .setName("de")
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
            .setName("a")
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
            .setMaxLength(100)
    )
    .addBooleanOption(option => option
        .setName("invisible")
        .setDescription("Si le message doit être invisible pour les autres utilisateurs, oui par défaut.")
    )

export default convertBase