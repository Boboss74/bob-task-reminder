import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../config.json';
import { Config } from '../models/config.model';
import { Task } from '../models/task.model';

export class MongoService {
    private mongoClient: MongoClient;

    constructor(mongoClient: MongoClient) {
        this.mongoClient = mongoClient;
    }

    public static async init(): Promise<MongoService> {
        const uri = config.mongoUri || 'mongodb://localhost:27017';

        console.info(`Connecting to MongoDB...`);

        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const mongoClient = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });

        // Send a ping to confirm a successful connection
        await mongoClient.db('admin').command({ ping: 1 });
        console.log('Successfully connected to MongoDB');

        return new MongoService(mongoClient);
    }

    public async close() {
        await this.mongoClient.close();
    }

    getCollections(guildId: string) {
        const db = this.mongoClient.db(`task-reminder-${guildId}`);
        return {
            taskCollection: db.collection<Task>('task'),
            configCollection: db.collection<Config>('config'),
        };
    }
}
