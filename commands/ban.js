// ban.js

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server.',
    usage: 'a!ban <@user> [reason]',
    execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            const noPermissionEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('❌ Insufficient Permissions')
                .setDescription('You do not have permission to use this command.');
            return message.reply({ embeds: [noPermissionEmbed] });
        }

        const member = message.mentions.members.first();
        if (!member) {
            const noMemberEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('❌ Invalid Usage')
                .setDescription('You need to mention the user you want to ban.')
                .addField('Usage', this.usage);
            return message.reply({ embeds: [noMemberEmbed] });
        }

        if (!member.bannable) {
            const cannotBanEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('❌ Error')
                .setDescription('I cannot ban this user. They may have a higher role than me or I do not have the necessary permissions.');
            return message.reply({ embeds: [cannotBanEmbed] });
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        member.ban({ reason: reason })
            .then(() => {
                const banEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('🔨 User Banned')
                    .setDescription(`${member.user.tag} has been banned.`)
                    .addField('Reason', reason);
                message.channel.send({ embeds: [banEmbed] });
            })
            .catch(error => {
                console.error(error);
                const errorEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('❌ Error')
                    .setDescription('There was an error banning this user.');
                message.reply({ embeds: [errorEmbed] });
            });
    },
};
