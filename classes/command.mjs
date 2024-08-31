import { SlashCommandBuilder, CommandInteraction } from "discord.js"

/**
 * @callback executeCallback
 * @param {CommandInteraction} interaction - the interaction with the discord '/' command
 * @returns {Promise}
 */

export default class Command {
    /**
     * 
     * @param {string} name - the name of the command, its the name used in the '/' command and should be unique (required)
     * @param {string} description - the desciption of the command (required)
     */
    constructor(name, description) {
        if (!name && !description) {throw new TypeError("The 'name' / 'description' of the command should be defined.")}
        /**
         * @type {SlashCommandBuilder}
         * @public
         */
        this.builder = new SlashCommandBuilder().setName(name).setDescription(description)
        /**
         * @type {executeCallback}
         * @public
         */
        this.execute = async (interaction) => {}
    }

    /**
     * 
     * @param {executeCallback} callback - the callback executed when the '/' command is used by a user
     * @returns {Command}
     */
    setExecute(callback) {
        this.execute = callback
        return this
    }
}