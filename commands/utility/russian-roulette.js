import { SlashCommandBuilder, EmbedBuilder } from "npm:discord.js"
import randomInt from "../../lib/randomInt.js"
import sleep from "../../lib/sleep.js"

const delayBeforeCountdown = 2500
const delayBeforeKick = 1500
const countdownSeconds = 5
const rejoinIviteAgeSeconds = 60
const ChanceToWin = 6
const teasingImg = "https://media1.tenor.com/m/xqS6tMixZboAAAAd/kurtlar-vadisi-%C3%A7ak%C4%B1r.gif"
const loseImg = "https://media1.tenor.com/m/eEs1jRy5UXgAAAAC/house-explosion.gif"
const winImg = "https://media1.tenor.com/m/jNXwTFt0PFMAAAAC/spongebob-squarepants.gif"

export default {
    data: new SlashCommandBuilder()
        .setName("russian-roulette")
        .setDescription("Une roulette r***e qui vous kick une fois sur six. Attention a vous ;)"),

    async execute(interaction) {
        const channelId = interaction.channelId
        const guild = interaction.guild
        const channel = await guild.channels.fetch(channelId)

        // embed with a gif which tell other users some is playing the r***ian roulette.
        const firstEmbed = new EmbedBuilder()
            .setTitle(`${interaction.user.displayName} joue a la roulette russe...`)
            .setImage(teasingImg)
            .setColor("#8fbc8f")
            .setFooter({
                text: interaction.user.displayName,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        // first reply with the "teasing embed" (user is playing...)
        await interaction.reply({
            embeds: [firstEmbed],
        })

        await sleep(delayBeforeCountdown)

        // countdown of x seconds
        for (let i = countdownSeconds; i >= 1; i--) {
            await sleep(1000)
            const embed = new EmbedBuilder()
                .setTitle(`${i}...`);

            channel.send({ embeds: [embed]})
        }

        const random = randomInt(ChanceToWin)

        await sleep(1000)

        // show whether the user has won or lost. If he loses, kick him.
        let finalEmbed = new EmbedBuilder()
        if (random == 1) {
            finalEmbed = finalEmbed
                .setTitle("Bang !")
                .setImage(loseImg)

            channel.send({ embeds: [finalEmbed]})

            await sleep(delayBeforeKick)

            // Create, and send a invite to the guild in DM of the user.
            try {
                const dm = await interaction.user.createDM(true)
                const invite = await channel.createInvite({ maxAge: rejoinIviteAgeSeconds+10, maxUses: 1 })
                dm.send({ content: `Gros BAKA! tu as encore joué à la roulette russe. \nBon, c'est bien parce que c'est toi, voila une invitation.\nAttention, tu n'as que ${rejoinIviteAgeSeconds} secondes pour rejoindre. \n${invite}`})
            } catch(err) {console.log(err)}

            // Kick the user if can.
            try {interaction.member.kick("Joue a la roulette russe.")}
            catch(err) {console.log(err)}
        } else {
            finalEmbed = finalEmbed
                .setTitle("Click...")
                .setImage(winImg)

                channel.send({ embeds: [finalEmbed]})
        }
    }
}