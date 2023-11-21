import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from '../models/bot.model';
import { DateParser } from '../parsers/date.parser';
import { TaskService } from '../services/task.service';
import { CheckUtil } from '../utils/check.util';

const command = new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Create new task reminder')
    .addStringOption((option) =>
        option
            .setName('duration')
            .setDescription('In how long the task should be remined. Examples: "30min", "5h 10min"')
            .setRequired(true),
    )
    .addStringOption((option) => option.setName('description').setDescription('Task description').setRequired(true));

const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('claim').setLabel('Claim').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('done').setLabel('Done').setStyle(ButtonStyle.Primary),
);

async function execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    interaction.isG;
    // 1. Get the 'time' option value.
    const duration = interaction.options.getString('duration');
    CheckUtil.ensureNotNulish(duration, 'Missing duration');
    const description = interaction.options.getString('description');
    CheckUtil.ensureNotNulish(description, 'Missing description');

    // 2. Convert it into furure Date.
    const durationDate = DateParser.addDurationToCurrentDate(duration);

    // 3. create task in db
    const taskService = new TaskService({} as any, {} as any); // TODO
    await taskService.createTask('TODO', durationDate.getTime(), description);

    // 4. reply with message + embed + buttons claim & done

    await interaction.reply({
        content: `Task created by ${interaction.user.username}.`,
        components: [row],
    });
}

export const taskCommand: Command = {
    data: command as SlashCommandBuilder,
    execute,
};
