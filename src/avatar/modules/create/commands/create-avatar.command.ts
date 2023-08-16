import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEntity } from 'src/avatar/entities/avatar.entity';
import { Repository } from 'typeorm';

export interface CreateAvatarCommandParams {
  mimetype: string;
  filename: string;
  size: number;
  userId: number;
}

export class CreateAvatarCommand {
  constructor(public readonly params: CreateAvatarCommandParams) {}
}

@CommandHandler(CreateAvatarCommand)
export class CreateAvatarCommandHandler
  implements ICommandHandler<CreateAvatarCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(AvatarEntity)
    private readonly avatarRepository: Repository<AvatarEntity>,
  ) {}

  async execute(command: CreateAvatarCommand) {
    return this.avatarRepository.save(command.params);
  }
}
