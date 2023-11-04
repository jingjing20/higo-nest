import { Module, forwardRef } from '@nestjs/common';
import { UserCreateController } from './controllers/user-create.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [UserCreateController],
  imports: [forwardRef(() => UserModule)],
})
export class UserCreateModule {}
