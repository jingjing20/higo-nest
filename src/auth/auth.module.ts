import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthLocalModule } from './modules/local/auth-local.module';

@Module({
  controllers: [AuthController],
  imports: [AuthLocalModule],
})
export class AuthModule {}
