// help.js

const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'List all available commands and their usage.',
    execute(message, args) {
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        const embed = new MessageEmbed()
            .setColor('#7289DA')
            .setTitle('Allesca Bot Commands')
            .setDescription('List of available commands and their usage');

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            embed.addField(`**${prefix}${command.name}**`, `${command.description}\nUsage: \`${prefix}${command.name}\``, false);
        }

        message.channel.send({ embeds: [embed] });
    },
};
