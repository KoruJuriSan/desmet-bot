module.exports = async (interaction, client) => {
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) {
            console.error(`An Unknown command as been called "${interaction.commandName}"`)
            return
        }
        
        try {
            await command.execute(interaction, client)
    
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    } else if (interaction.isButton()) {
        customId = interaction.customId
        buttonName = customId.split("#")[0]

        args = {}
        if (customId.includes("#") && customId.includes(":")) {
            customId.split("#")[1].split(",").forEach(element => {
                items = element.split(":")
                args[items[0]] = items[1]
            })
        }

        button = client.buttons.get(buttonName)
        if (!button) {
            console.error(`An Unknown command as been called "${interaction.commandName}"`)
            return
        }

        try {
            await button.execute(interaction, client, args )
    
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    } else return

}