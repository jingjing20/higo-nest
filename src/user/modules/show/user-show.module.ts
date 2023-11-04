import { Module, forwardRef } from '@nestjs/common';
import { UserShowController } from './controllers/user-show.controller';
import { UserModule } from '../../user.module';

@Module({
  controllers: [UserShowController],
  imports: [forwardRef(() => UserModule)],
})
export class UserShowModule {}
