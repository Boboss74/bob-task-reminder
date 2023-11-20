import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from '../models/bot.model';

const command = new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Create new task reminder')
    .addStringOption((option) =>
        option.setName('time').setDescription('In how long the task should be remined. Examples: "30min", "5h 10min"').setRequired(true),
    )
    .addStringOption((option) => option.setName('description').setDescription('Task description').setRequired(true));

const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('claim').setLabel('Claim').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('done').setLabel('Done').setStyle(ButtonStyle.Primary),
);

async function execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    // 1. Get the 'time' option value.
    const timeOption = interaction.options.getString('time');

    // 2. Convert it into furure Date.

    // 3. create task in db

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
