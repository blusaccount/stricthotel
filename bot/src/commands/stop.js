import { SlashCommandBuilder } from 'discord.js';
import { deleteQueue } from '../utils/player.js';

export const data = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stoppt die Musik und verlässt den Channel');

export async function execute(interaction) {
    deleteQueue(interaction.guildId);
    await interaction.reply('⏹️ Musik gestoppt. Bis später!');
}
