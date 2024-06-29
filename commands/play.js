const ytdl = require('ytdl-core-discord');

module.exports = {
    name: 'play',
    description: 'Play a song from YouTube',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        console.log(voiceChannel); // Log voice channel object for debugging
        if (!voiceChannel) return message.reply('You need to be in a voice channel to play music!');

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.reply('I need the permissions to join and speak in your voice channel!');
        }

        try {
            // Extract VoiceChannel object from the GuildChannel
            const voiceChannelObject = message.guild.channels.cache.get(voiceChannel.id);
            if (!voiceChannelObject || voiceChannelObject.type !== 'GUILD_VOICE') {
                return message.reply('Voice channel not found!');
            }

            const connection = await voiceChannelObject.join();
            if (!connection) return message.reply('Error connecting to voice channel!');

            const stream = await ytdl(args[0], { filter: 'audioonly' });
            const dispatcher = connection.play(stream, { type: 'opus' });

            dispatcher.on('start', () => {
                message.channel.send('Now playing: ' + args[0]);
            });

            dispatcher.on('finish', () => {
                voiceChannel.leave();
            });

            dispatcher.on('error', (error) => {
                console.error(error);
                message.reply('Error playing the song!');
            });
        } catch (error) {
            console.error(error);
            message.reply('Error playing the song!');
        }
    },
};
