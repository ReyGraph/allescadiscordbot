// warn.js

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'warn',
    description: 'Warn a user in the server.',
    usage: 'a!warn <@user> [reason]',
    execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
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
                .setDescription('You need to mention the user you want to warn.')
                .addField('Usage', this.usage);
            return message.reply({ embeds: [noMemberEmbed] });
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        const warnEmbed = new MessageEmbed()
            .setColor('#ffff00')
            .setTitle('⚠️ User Warned')
            .setDescription(`${member.user.tag} has been warned.`)
            .addField('Reason', reason);
        message.channel.send({ embeds: [warnEmbed] });
    },
};
