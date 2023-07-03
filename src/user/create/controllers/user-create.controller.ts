import { Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';

@Controller('user-create')
export class UserCreateController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post()
  createUser() {
    console.log('Controller createUser');
    return this.commandBus.execute(
      new CreateUserCommand({ name: 'jingjing', password: '1818181818' }),
    );
  }
}
