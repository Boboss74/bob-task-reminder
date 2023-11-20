# BobTaskReminder

BobTaskReminder is a Discord bot designed to allows users to create tasks, receive countdown reminders, claim tasks, mark tasks as done, and more.

## Features

### Task Creation

- Command: `/task <countdown> <task_description>`
- Event Triggered: `EVENT_TASK_CREATION`
- Message Sent: `MESSAGE_TASK_CREATED`
  - Includes task details (creator, countdown, task_description)
  - Buttons:
    - `BUTTON_TASK_CLAIMED`: Claim the task.
    - `BUTTON_TASK_DONE`: Mark the task as done.

### Countdown Reached

- Event Triggered: `EVENT_TASK_COUNTDOWN_REACHED`
- Actions:
  - Delete the previous `MESSAGE_TASK_CREATED`.
  - Send a new `MESSAGE_TASK_COUNTDOWN_REACHED` with:
    - Task details.
    - Time of availability (timestamp format).
    - Buttons:
      - `BUTTON_TASK_CLAIMED`: Claim the task.
      - `BUTTON_TASK_DONE`: Mark the task as done.
    - Tag the person who claimed (if any).

### Countdown Expired (1 day)

- Event Triggered: `EVENT_TASK_COUNTDOWN_EXPIRED`
- Actions:
  - Delete the previous `MESSAGE_TASK_COUNTDOWN_REACHED`.
  - Send a new `MESSAGE_TASK_ALERT` with:
    - Task details.
    - Tag a specific role.
    - Buttons:
      - `BUTTON_TASK_CLAIMED`: Claim the task.
      - `BUTTON_TASK_DONE`: Mark the task as done.

### Claiming a Task

- Button: `BUTTON_TASK_CLAIMED`
- Event Triggered: `EVENT_TASK_CLAIMED`
  - The last person who clicks the button gets assigned to the task.
  - Update message content about the claimer.

### Marking Task as Done

- Button: `BUTTON_TASK_DONE`
- Event Triggered: `EVENT_TASK_DONE`
  - Disables countdown reminders (reached, expired).
  - Edits the message to remove buttons (`BUTTON_TASK_CLAIMED`, `BUTTON_TASK_DONE`).
  - Edits task details to indicate who marked the task as done.

## Configuration

Add and complete config.json

```json
{
  "discord": {
    "clientId": "",
    "token": "",
    "guildId": ""
  },
  "mongoUri": ""
}
```
