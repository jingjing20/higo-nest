import { Module } from '@nestjs/common';
import { AuthLocalStrategy } from './providers/auth-local.strategy';
import { ValidateUserCredentialCommandHandler } from './commands/validate-user-credential.command';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthLocalStrategy, ValidateUserCredentialCommandHandler],
})
export class AuthLocalModule {}
