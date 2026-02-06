import { SlashCommandBuilder } from 'discord.js';
import { getQueue } from '../utils/player.js';

export const data = new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pausiert die Musik');

export async function execute(interaction) {
    const queue = getQueue(interaction.guildId);

    if (!queue || !queue.playing) {
        return interaction.reply({ content: '❌ Nichts läuft gerade!', ephemeral: true });
    }

    queue.player.pause();
    await interaction.reply('⏸️ Musik pausiert.');
}
