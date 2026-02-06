import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getQueue } from '../utils/player.js';

export const data = new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Zeigt den aktuellen Song');

export async function execute(interaction) {
    const queue = getQueue(interaction.guildId);

    if (!queue || queue.songs.length === 0) {
        return interaction.reply({ content: '🔇 Gerade läuft nichts.', ephemeral: true });
    }

    const song = queue.songs[0];
    const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('🎵 Spielt gerade')
        .setDescription(`**[${song.title}](${song.url})**`)
        .addFields({ name: 'Dauer', value: song.duration || 'Unbekannt', inline: true })
        .setThumbnail(song.thumbnail);

    await interaction.reply({ embeds: [embed] });
}
