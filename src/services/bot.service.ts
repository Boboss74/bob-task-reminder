import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js';

import { taskCommand } from '../commands/task.command';
import config from '../config.json';
import { Command } from '../models/bot.model';
import { MongoService } from './mongo.service';

export class BotService {
    private client: Client<boolean>;
    private mongoService: MongoService;

    public static readonly commands = [taskCommand];

    private constructor(client: Client, mongoService: MongoService) {
        this.client = client;
        this.mongoService = mongoService;
        client.once(Events.ClientReady, (c) => {
            console.log('Discord Bot ready', c.user.tag);
        });
    }

    public async close() {
        await this.client.destroy();
    }

    public static async init(mongoService: MongoService): Promise<BotService> {
        const client = new Client({ intents: [GatewayIntentBits.Guilds] });

        const commandMap = new Map<string, Command>(BotService.commands.map((c) => [c.data.name, c]));

        client.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isChatInputCommand()) {
                return;
            }

            const command = commandMap.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                console.log(`Executing ${interaction.commandName}...`);
                await command.execute(interaction);
                console.log(`${interaction.commandName} executed`);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        });

        await client.login(config.discord.token);

        return new BotService(client, mongoService);
    }

    public static async reloadGuildCommands(guildId: string) {
        // Construct and prepare an instance of the REST module
        const rest = new REST().setToken(config.discord.token);

        console.log(`Started refreshing ${BotService.commands.length} commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        await rest.put(Routes.applicationGuildCommands(config.discord.clientId, guildId), {
            body: BotService.commands.map((c) => c.data.toJSON()),
        });
        console.log(`Successfully reloaded commands.`);
    }
}
