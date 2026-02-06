import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getQueue } from '../utils/player.js';

export const data = new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Zeigt die aktuelle Warteschlange');

export async function execute(interaction) {
    const queue = getQueue(interaction.guildId);

    if (!queue || queue.songs.length === 0) {
        return interaction.reply({ content: '📭 Die Queue ist leer!', ephemeral: true });
    }

    const songs = queue.songs.slice(0, 10);
    const description = songs.map((song, i) => {
        const prefix = i === 0 ? '▶️' : `${i}.`;
        return `${prefix} **${song.title}** (${song.duration || '?'})`;
    }).join('\n');

    const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle('🎶 Warteschlange')
        .setDescription(description);

    if (queue.songs.length > 10) {
        embed.setFooter({ text: `...und ${queue.songs.length - 10} weitere Songs` });
    }

    await interaction.reply({ embeds: [embed] });
}
