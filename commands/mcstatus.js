// mcstatus.js

const { MessageEmbed } = require('discord.js');
const net = require('net');

module.exports = {
    name: 'mcstatus',
    description: 'Check the status of the Minecraft server.',
    execute(message) {
        const serverAddress = 'allesca.play-creative.com';
        const serverPort = 3875;

        const socket = new net.Socket();

        const startTime = Date.now();

        const loadingEmoji = '⌛'; // Loading emoji
        const onlineEmoji = '✅'; // Online emoji
        const offlineEmoji = '❌'; // Offline emoji

        const loadingEmbed = new MessageEmbed()
            .setColor('#FFFF00')
            .setTitle('Minecraft Server Status')
            .setDescription(`${loadingEmoji} Checking server status...`);

        message.channel.send({ embeds: [loadingEmbed] }).then((loadingMessage) => {
            socket.connect(serverPort, serverAddress, () => {
                const pingTime = Date.now() - startTime;
                socket.end();

                const statusEmbed = new MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Minecraft Server Status')
                    .setDescription(`${onlineEmoji} The server is online.`)
                    .addFields(
                        { name: 'Server IP', value: serverAddress },
                        { name: 'Port', value: serverPort.toString() },
                        { name: 'Uptime', value: '24/7' },
                        { name: 'Max Players', value: '150' },
                        { name: 'Version', value: '1.20.4 (ViaVersion)' },
                        { name: 'Cracked', value: 'Allowed' },
                        { name: 'Ping', value: `${pingTime}ms` }
                    )
                    .setThumbnail('https://cdn.discordapp.com/attachments/931865466836750407/1235635313410314240/AllescaBanner3.png?ex=663a5c8f&is=66390b0f&hm=9f3b327ec48528a6dac21508113cd00cdf92bd981d22b1064ec05c8d682159e4&'); // Minecraft server icon

                loadingMessage.edit({ embeds: [statusEmbed] });
            });

            socket.on('error', () => {
                const errorEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Minecraft Server Status')
                    .setDescription(`${offlineEmoji} The server is currently offline or an error occurred while fetching the status.`);

                loadingMessage.edit({ embeds: [errorEmbed] });
            });
        });
    },
};
