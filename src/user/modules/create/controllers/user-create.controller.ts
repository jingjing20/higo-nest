import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { CreateUserDto } from '../dtos/create-user-dto';

@Controller('user-create')
export class UserCreateController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post()
  createUser(@Body() body: CreateUserDto) {
    console.log('Controller createUser');
    return this.commandBus.execute(new CreateUserCommand(body));
  }
}
