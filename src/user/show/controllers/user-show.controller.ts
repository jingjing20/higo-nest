import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../queries/get-user.query';

@Controller('user-show')
export class UserShowController {
  constructor(private queryBus: QueryBus) {}
  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.queryBus.execute(new GetUserQuery({ id: userId }));
  }
}
