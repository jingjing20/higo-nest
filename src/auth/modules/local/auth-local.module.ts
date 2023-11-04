import { Module } from '@nestjs/common';
import { AuthLocalStrategy } from './providers/auth-local.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthLocalStrategy],
})
export class AuthLocalModule {}
