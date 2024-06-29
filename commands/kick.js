// kick.js

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            const noPermissionEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Insufficient Permissions')
                .setDescription('You do not have permission to use this command.');
            return message.reply({ embeds: [noPermissionEmbed] });
        }

        const member = message.mentions.members.first();
        if (!member) {
            const noMemberEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Invalid Usage')
                .setDescription('You need to mention the user you want to kick.');
            return message.reply({ embeds: [noMemberEmbed] });
        }

        if (!member.kickable) {
            const cannotKickEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('I cannot kick this user. They may have a higher role than me or I do not have the necessary permissions.');
            return message.reply({ embeds: [cannotKickEmbed] });
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';
        member.kick(reason)
            .then(() => {
                const kickEmbed = new MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('User Kicked')
                    .setDescription(`${member.user.tag} has been kicked from the server.`)
                    .addField('Reason', reason);
                message.channel.send({ embeds: [kickEmbed] });
            })
            .catch(error => {
                console.error(error);
                const errorEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('There was an error kicking this user.');
                message.reply({ embeds: [errorEmbed] });
            });
    },
};
