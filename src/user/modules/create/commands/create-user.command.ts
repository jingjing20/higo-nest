import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/user-created.event';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

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
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(command: CreateUserCommand) {
    const user = await this.userRepository.save(command.params);
    console.log('CommandHandler');
    this.eventBus.publish(new UserCreatedEvent(user));
    return {
      insertId: user.id,
    };
  }
}
