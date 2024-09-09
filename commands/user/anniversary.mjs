import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import { AnniversaryModel } from "../../schemas/models.mjs"
import Command from "../../classes/command.mjs"

const anniversary = new Command("anniversary", "Permet de definir votre date d'anniveraire.")
    .setExecute(async (interaction) => {
        const args = interaction.options
        const day = args.getNumber("day")
        const month = args.getNumber("month")
        const guild_id = interaction.guild.id
        const user_id = interaction.member.user.id
        const query = {guild_id: guild_id, user_id: user_id}

        dayjs.extend(customParseFormat)
        const date = dayjs(`2024-${month}-${day}`, "YYYY-M-D", true)
        
        if (!date.isValid()) {
            
            const message = `${day} n'est pas un bon jour pour le ${month} mois de l'année.`

            await interaction.reply({
                ephemeral: true,
                content: message
            })

        } else {

            try {
                const entry = await AnniversaryModel.findOne(query)
    
                if (!entry) {

                    const anniversaryEntry = await AnniversaryModel.create({
                        guild_id: guild_id,
                        user_id: user_id,
                        date: date.toDate()
                    })

                    await anniversaryEntry.save()

                } else {

                    await AnniversaryModel.findOneAndUpdate(query, {date: date.toDate()})

                }

            } catch(err) {console.error(err)}

            const messsage = `Votre date de naissance a été mise à jour. (${date.format("DD/MM")})`

            await interaction.reply({
                ephemeral: true,
                content: messsage
            })

        }
    })

anniversary.builder = anniversary.builder
    .addNumberOption(option => option
        .setName("day")
        .setDescription("le jour de votre naissance (1-31)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(31)
    )
    .addNumberOption(option => option
        .setName("month")
        .setDescription("Le mois de votre naissance (1-12)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(12)
    )

export default anniversary