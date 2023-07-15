import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthLocalModule } from './modules/local/auth-local.module';
import { AuthJwtModule } from './modules/jwt/auth-jwt.module';

@Module({
  controllers: [AuthController],
  imports: [AuthLocalModule, AuthJwtModule],
})
export class AuthModule {}
