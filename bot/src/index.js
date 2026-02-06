import { Client, GatewayIntentBits, Collection, Events } from 'discord.js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync } from 'fs';
import { createRequire } from 'module';
import { createServer } from 'http';

const require = createRequire(import.meta.url);
const sodium = require('libsodium-wrappers');

config();

// Sodium muss vor Voice-Nutzung geladen sein
await sodium.ready;
console.log('✓ Sodium geladen');

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.commands = new Collection();

// Commands laden
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(`file://${filePath}`);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`✓ Command geladen: ${command.data.name}`);
    }
}

// Command Handler
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Fehler bei Command ${interaction.commandName}:`, error);
        try {
            const reply = { content: '❌ Fehler beim Ausführen des Commands!', flags: 64 };
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(reply);
            } else {
                await interaction.reply(reply);
            }
        } catch (e) {
            // Interaction bereits abgelaufen, ignorieren
        }
    }
});

// Verhindert Bot-Crash bei unhandled errors
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.once(Events.ClientReady, c => {
    console.log(`✓ Bot online als ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

// HTTP Server für Render.com Health Check
const PORT = process.env.PORT || 3000;
createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('StrictBot is running!');
}).listen(PORT, () => {
    console.log(`✓ Health-Check Server auf Port ${PORT}`);
});
