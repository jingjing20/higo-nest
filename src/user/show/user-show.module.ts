import { Module } from '@nestjs/common';
import { UserShowController } from './controllers/user-show.controller';
import { GetUserQueryHandler } from './queries/get-user.query';

@Module({
  controllers: [UserShowController],
  providers: [GetUserQueryHandler],
})
export class UserShowModule {}
