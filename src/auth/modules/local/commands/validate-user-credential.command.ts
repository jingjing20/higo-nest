import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

export interface ValidateUserCredentialCommandParams {
  name: string;
  password: string;
}

export class ValidateUserCredentialCommand {
  constructor(public readonly params: ValidateUserCredentialCommandParams) {}
}

@CommandHandler(ValidateUserCredentialCommand)
export class ValidateUserCredentialCommandHandler
  implements ICommandHandler<ValidateUserCredentialCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(command: ValidateUserCredentialCommand) {
    const { name, password } = command.params;
    const [user] = await this.userRepository.find({ where: { name } });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    console.log('user', user);

    const isPasswordMatches = await bcrypt.compare(password, user.password);
    if (!isPasswordMatches) {
      throw new BadRequestException('密码错误');
    }

    return user;
  }
}
