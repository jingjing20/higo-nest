import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

export interface SendMessageCommandParams {
  message: string;
}

export class SendMessageCommand {
  constructor(public readonly params: SendMessageCommandParams) {}
}

@CommandHandler(SendMessageCommand)
export class SendMessageCommandHandler
  implements ICommandHandler<SendMessageCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: SendMessageCommand) {
    console.log(command.params.message);
    return command;
  }
}
