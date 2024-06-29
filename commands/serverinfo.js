const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server.',
    async execute(message) {
        try {
            const guildId = message.guild.id;
            const response = await fetch(`https://discord.com/api/v9/guilds/${guildId}`, {
                headers: {
                    'Authorization': `Bot ${message.client.token}`
                }
            });
            const data = await response.json();

            if (!data) {
                throw new Error('Failed to fetch server data');
            }

            console.log('Fetched server data:', data);

            const owner = message.guild.members.cache.get(data.owner_id);
            console.log('Owner:', owner);

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Server Information - ${message.guild.name}`)
                .addField('Owner', owner ? owner.user.tag : 'Unknown', true)
                .addField('Region', message.guild.region, true)
                .addField('Members', message.guild.memberCount, true)
                .addField('Created At', message.guild.createdAt.toDateString(), true)
                .addField('Channels', message.guild.channels.cache.size, true)
                .addField('Roles', message.guild.roles.cache.size, true)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching server info:', error);
            message.channel.send('Failed to retrieve server information.');
        }
    },
};
