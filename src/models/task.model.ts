/**
 * Represents a task entity with essential details.
 */
export interface Task {
    /**
     * Unique identifier for the task.
     */
    id: string;

    /**
     * Discord server ID.
     */
    guildId: string;

    /**
     * Discord channel ID.
     */
    channelId: string;

    /**
     * Last message ID related to this task.
     */
    lastMessageId?: string;

    /**
     * Discord user ID of the task creator.
     */
    creator: string;

    /**
     * Task description.
     */
    description: string;

    /**
     * Countdown duration in seconds.
     */
    countdown: number;

    /**
     * Discord user ids who claimed the task.
     */
    claimerIds: string[];

    /**
     * Discord user ID of the person who marked the task as done.
     */
    doneBy?: string;

    /**
     * Date ISO when the task was created.
     */
    createdAt: string;

    /**
     * Date ISO when the task should is ready to be done. An alter will be sent as a reminder.
     */
    readyAt: string;

    /**
     * Date ISO when the task should be snoozed. An alert will be sent as a reminder.
     */
    snoozeAt: string;

    /**
     * Date ISO when the task is done.
     */
    doneAt?: string;

    /**
     * True when ready event triggered.
     */
    readyEventTriggered: boolean;

    /**
     * True when snooze event triggered.
     */
    snoozeEventTriggered: boolean;
}
