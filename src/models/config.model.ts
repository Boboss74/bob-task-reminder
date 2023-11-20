/**
 * Configuration for a specific Guild.
 */
export interface Config {
    /**
     * Discord server ID.
     */
    guildId: string;

    /**
     * Tag rules to apply when a task is ready.
     */
    tagRulesOnTaskReady: 'tag-nobody' | 'tag-claimers' | 'tag-role-if-no-claimer';

    /**
     * Roles to tag when a task is ready.
     */
    roleToTagOnTaskReady: string[];

    /**
     * Tag rules to apply when a task is snoozed.
     */
    tagRulesOnTaskSnoozed: 'tag-nobody' | 'tag-claimers' | 'tag-role-if-no-claimer';

    /**
     * Roles to tag when a task is snoozed.
     */
    rolesToTagOnTaskSnooze: string[];

    /**
     * Snooze duration in seconds.
     */
    snoozeDuration: number;
}
