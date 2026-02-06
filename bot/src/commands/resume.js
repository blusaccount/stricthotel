import { SlashCommandBuilder } from 'discord.js';
import { getQueue } from '../utils/player.js';

export const data = new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Setzt die Musik fort');

export async function execute(interaction) {
    const queue = getQueue(interaction.guildId);

    if (!queue) {
        return interaction.reply({ content: '❌ Keine aktive Queue!', ephemeral: true });
    }

    queue.player.unpause();
    await interaction.reply('▶️ Musik fortgesetzt.');
}
