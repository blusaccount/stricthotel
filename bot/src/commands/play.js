import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import {
    getQueue,
    createQueue,
    joinChannel,
    searchYouTube,
    playSong,
    setupPlayerEvents
} from '../utils/player.js';

export const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Spielt einen Song von YouTube')
    .addStringOption(option =>
        option.setName('query')
            .setDescription('YouTube URL oder Suchbegriff')
            .setRequired(true));

export async function execute(interaction) {
    const query = interaction.options.getString('query');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
        return interaction.reply({ content: '❌ Du musst in einem Voice Channel sein!', flags: 64 });
    }

    await interaction.deferReply();

    try {
        // Video-Info holen
        const songs = await searchYouTube(query);
        if (!songs || songs.length === 0) {
            return interaction.editReply('❌ Nichts gefunden. Versuche eine andere Suche.');
        }

        let queue = getQueue(interaction.guildId);

        // Neue Queue erstellen falls nötig
        if (!queue) {
            queue = createQueue(interaction.guildId);
            queue.connection = await joinChannel(voiceChannel);
            queue.connection.subscribe(queue.player);
            setupPlayerEvents(queue, interaction.guildId, interaction.channel);
        }

        // Songs zur Queue hinzufügen
        const wasEmpty = queue.songs.length === 0;
        queue.songs.push(...songs);

        // Embed erstellen
        if (songs.length === 1) {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle(wasEmpty ? '🎵 Spiele jetzt' : '➕ Zur Queue hinzugefügt')
                .setDescription(`**[${songs[0].title}](${songs[0].url})**`)
                .addFields({ name: 'Dauer', value: songs[0].duration || 'Unbekannt', inline: true })
                .setThumbnail(songs[0].thumbnail);

            await interaction.editReply({ embeds: [embed] });
        } else {
            await interaction.editReply(`✅ **${songs.length} Songs** zur Queue hinzugefügt!`);
        }

        // Abspielen falls Queue leer war
        if (wasEmpty) {
            await playSong(queue, queue.songs[0]);
        }

    } catch (error) {
        console.error('Play Error:', error);
        await interaction.editReply('❌ Fehler beim Laden des Songs.');
    }
}
