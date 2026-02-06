import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync } from 'fs';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const commands = [];
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(`file://${filePath}`);
    if ('data' in command) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

try {
    console.log(`Registriere ${commands.length} Commands...`);

    // Global deployment (dauert bis zu 1 Stunde)
    // Für schnelleres Testen: Guild-spezifisch deployen
    if (process.env.GUILD_ID) {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log('✓ Commands auf Server registriert (sofort verfügbar)');
    } else {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('✓ Commands global registriert (kann bis zu 1h dauern)');
    }
} catch (error) {
    console.error('Fehler beim Registrieren:', error);
}
