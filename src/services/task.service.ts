import { Collection } from 'mongodb';
import shortUUID from 'short-uuid';
import { Config } from '../models/config.model';
import { Task } from '../models/task.model';
import { CheckUtil } from '../utils/check.util';
import { MongoService } from './mongo.service';

/**
 * Manages tasks by interacting with a MongoDB collection.
 */
export class TaskService {
    private readonly config: Config;
    private readonly collection: Collection<Task>;

    constructor(config: Config, mongoService: MongoService) {
        this.config = config;
        this.collection = mongoService.getCollections(config.guildId).taskCollection;
    }

    /**
     * Creates a new task and adds it to the MongoDB collection.
     * @param creator - The user ID of the task creator.
     * @param countdown - The countdown duration in seconds.
     * @param description - The task description.
     * @returns The created task.
     */
    async createTask(creator: string, countdown: number, description: string): Promise<Task> {
        const id = this.generateUniqueId();
        const now = new Date();

        const readyAtDate = new Date(now.getTime() + countdown * 1000);

        const newTask: Task = {
            id,
            creator,
            description,
            countdown,
            guildId: this.config.guildId,
            channelId: '',
            claimerIds: [],
            createdAt: now.toISOString(),
            readyAt: readyAtDate.toISOString(),
            snoozeAt: new Date(readyAtDate.getTime() + this.config.snoozeDuration * 1000).toISOString(),
            readyEventTriggered: false,
            snoozeEventTriggered: false,
        };

        await this.collection.insertOne(newTask);
        return newTask;
    }

    /**
     * Deletes a task based on its ID.
     * @param taskId - The ID of the task to delete.
     * @returns
     */
    async deleteTask(taskId: string) {
        await this.collection.deleteOne({ id: taskId });
    }

    /**
     * Retrieves a task based on its ID.
     * @param taskId - The ID of the task to retrieve.
     * @returns The retrieved task, or null if not found.
     */
    async getTask(taskId: string): Promise<Task | null> {
        return this.collection.findOne<Task>({ id: taskId }, { projection: { _id: 0 } });
    }

    /**
     * Retrieves a task based on its ID.
     * @param taskId - The ID of the task to retrieve.
     * @returns The retrieved task, or null if not found.
     */
    async requireTask(taskId: string): Promise<Task> {
        const result = await this.getTask(taskId);
        CheckUtil.ensureTruthy(result, `Task ${taskId} not found.`);
        return result;
    }

    /**
     * Claims a task for a specific user.
     * @param taskId - The ID of the task to claim.
     * @param claimerId - The user ID of the person claiming the task.
     */
    async claimTask(taskId: string, claimerId: string) {
        await this.collection.updateOne({ id: { $eq: taskId } }, { $addToSet: { claimerIds: claimerId } });
    }

    /**
     * Marks a task as done by a specific user.
     * @param taskId - The ID of the task to mark as done.
     * @param doneBy - The user ID of the person marking the task as done.
     */
    async markTaskAsDone(taskId: string, doneBy: string) {
        await this.collection.updateOne({ id: taskId }, { $set: { doneBy, doneAt: new Date().toISOString() } });
    }

    /**
     * Generates a unique ID for tasks.
     * @returns The generated unique ID.
     */
    private generateUniqueId() {
        // Implement your own logic to generate unique IDs
        return shortUUID.generate();
    }
}
