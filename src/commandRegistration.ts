import config from './config.json';
import { BotService } from './services/bot.service';

void (async () => {
    await BotService.reloadGuildCommands(config.discord.guildId);
    process.exit(0);
})().catch((error) => {
    console.error('An unhandled promise rejection occurred:', error);
    process.exit(1);
});
