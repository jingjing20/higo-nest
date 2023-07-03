import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('user-show')
export class UserShowController {
  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return `user ${userId}`;
  }
}
