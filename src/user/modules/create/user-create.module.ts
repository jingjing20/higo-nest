import { Module, forwardRef } from '@nestjs/common';
import { UserCreateController } from './controllers/user-create.controller';
import { CreateUserCommandHandler } from './commands/create-user.command';
import { UserCreatedEventHandler } from './events/user-created.event';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [UserCreateController],
  providers: [CreateUserCommandHandler, UserCreatedEventHandler],
  imports: [forwardRef(() => UserModule)],
})
export class UserCreateModule {}
