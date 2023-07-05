import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/user-created.event';

export interface CreateUserCommandParams {
  name: string;
  password: string;
}

export class CreateUserCommand {
  constructor(public readonly params: CreateUserCommandParams) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: CreateUserCommand) {
    const { name, password } = command.params;
    console.log('CommandHandler');
    this.eventBus.publish(new UserCreatedEvent({ name: name }));
    return `create-user name:${name}; password:${password}`;
  }
}
