import { Module } from '@nestjs/common';
import { SendMessageCommandHandler } from './commands/send-message.command';

@Module({
  providers: [SendMessageCommandHandler],
})
export class AppNotificationModule {}
