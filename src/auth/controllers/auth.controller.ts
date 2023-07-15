import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from '../modules/local/guards/auth-local.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CommandBus } from '@nestjs/cqrs';
import { CreateJwtCommand } from '../modules/jwt/commands/create-jwt.command';

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  @UseGuards(AuthLocalGuard)
  async login(@CurrentUser() user: UserEntity) {
    const { id, name } = user;
    const token = await this.commandBus.execute(
      new CreateJwtCommand({ id, name }),
    );
    return { id, name, token };
  }
}
