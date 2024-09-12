import { ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js"

/**
 * @callback executeButtonCallback
 * @param {ButtonInteraction} interaction - a discord button interaction
 * @returns {Promise}
 */

export default class Button {
    /**
     * 
     * @param {string} name - The button name to recognize it from the orthers, must be unique (required)
     */
    constructor(name) {
        if (!name) {throw new TypeError("The 'name' of the button should be defined.")}
        
        /**
         * @type {string}
         * @public
         */
        this.name = name
        /**
         * @type {executeButtonCallback}
         * @public
         */
        this.execute = async (interaction) => {}
    }

    /**
     * 
     * @param {string} label - The label on the button (required) 
     * @param {ButtonStyle|undefined|null} style - The button style - priamry by default (optional)
     * @returns 
     */
    create(label, style) {
        if (!label) {throw new Error(`The label of the ${this.name} Button should be defined`)}
        const finalStyle = style ?? ButtonStyle.Primary


        return new ButtonBuilder()
            .setCustomId(`${this.name}`)
            .setStyle(finalStyle)
            .setLabel(label)
    }


    /**
     * 
     * @param {executeButtonCallback} callback - the callback called when the button is pushed.
     * @returns {Button}
     */
    setExecute(callback) {
        this.execute = callback
        return this
    }
}