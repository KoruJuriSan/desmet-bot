import { SlashCommandBuilder, EmbedBuilder } from "npm:discord.js"
import { isBinary } from "../../lib/baseVerification.js"

export default {
    data: new SlashCommandBuilder()
        .setName("binary-operation")
        .setDescription("Permet de faire des operations elementaires sur des nombres binaires")
        .addNumberOption(option => 
            option
                .setName("nombre-1")
                .setDescription("Le premier nombre de l'opération.")
                .setRequired(true)
        )
        .addStringOption(option => 
            option
                .setName("operateur")
                .setDescription("L'operateur du calcul")
                .setRequired(true)
                .setChoices(
                    {name: "+", value: "+"},
                    {name: "-", value: "-"},
                    {name: "/", value: "/"},
                    {name: "x", value: "x"},
                )
        )
        .addNumberOption(option => 
            option
                .setName("nombre-2")
                .setDescription("Le deuxième nombre de l'opération.")
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
        const firstNumberString = args.getNumber("nombre-1")
        const secondNumberString = args.getNumber("nombre-2")
        const operator = args.getString("operateur")
        const isEphemeral = args.getBoolean("ephemeral") ?? true

        if (isBinary(firstNumberString) && isBinary(secondNumberString)) {
            const firstNumber = parseInt(firstNumberString, 2)
            const secondNumber = parseInt(secondNumberString, 2)
            
            let result = 0
            switch (operator) {
                case "+":
                    result = firstNumber + secondNumber
                    break

                case "-":
                    result = firstNumber - secondNumber
                    break
                
                case "/":
                    result = firstNumber / secondNumber
                    break

                case "x":
                    result = firstNumber * secondNumber
            }

            const binaryResult = result.toString(2)

            const embed = new EmbedBuilder()
                .setAuthor({
                    name: bot.displayName,
                    iconURL: bot.displayAvatarURL(),
                })
                .setTitle("Conversion de base.")
                .setDescription(`Operation\n\`\`\`${firstNumber} ${operator} ${secondNumber}\`\`\`\nRésultat en binaire.\n\`\`\`${binaryResult}\`\`\`\nRésultat en décimal.\n\`\`\`${result}\`\`\``)
                .setColor("#8fbc8f")

            await interaction.reply({
                embeds: [embed],
                ephemeral: isEphemeral
            })

        } else {
            await interaction.reply({
                content: `L'un des nombres donné (${firstNumberString} ou ${secondNumberString}) n'est pas un nombre binaire.`,
                ephemeral: true
            })
        }
    }
}