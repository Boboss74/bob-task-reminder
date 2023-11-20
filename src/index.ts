import { BotService } from './services/bot.service';
import { MongoService } from './services/mongo.service';

void (async () => {
    const mongoService = await MongoService.init();
    const botService = await BotService.init(mongoService);

    // catching signals and do something before exit
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'].forEach(
        (sig) =>
            process.on(sig, async () => {
                console.log('\n', sig);
                await mongoService.close();
                await botService.close();
                process.exit(0); // if you don't close yourself this will run forever
            }),
    );
})().catch((error) => {
    console.error('An unhandled promise rejection occurred:', error);
    process.exit(1);
});
