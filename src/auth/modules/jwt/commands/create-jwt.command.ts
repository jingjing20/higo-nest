import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

export interface CreateJwtCommandParams {
  id: number;
  name: string;
}

export class CreateJwtCommand {
  constructor(public readonly params: CreateJwtCommandParams) {}
}

@CommandHandler(CreateJwtCommand)
export class CreateJwtCommandHandler
  implements ICommandHandler<CreateJwtCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: CreateJwtCommand) {
    const accessToken = this.jwtService.sign(command.params);
    return accessToken;
  }
}
