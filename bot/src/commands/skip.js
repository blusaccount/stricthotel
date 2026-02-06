import { SlashCommandBuilder } from 'discord.js';
import { getQueue } from '../utils/player.js';

export const data = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Überspringt den aktuellen Song');

export async function execute(interaction) {
    const queue = getQueue(interaction.guildId);

    if (!queue || queue.songs.length === 0) {
        return interaction.reply({ content: '❌ Nichts zum Überspringen!', ephemeral: true });
    }

    const skipped = queue.songs[0].title;
    queue.player.stop(); // Triggert automatisch den nächsten Song

    await interaction.reply(`⏭️ **${skipped}** übersprungen.`);
}
