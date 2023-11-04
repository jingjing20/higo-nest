import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from '../modules/local/guards/auth-local.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthJwtGuard } from '../modules/jwt/guards/auth-jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  @UseGuards(AuthLocalGuard)
  async login(@CurrentUser() user: UserEntity) {
    const { id, name } = user;
    const token = this.jwtService.sign({ id, name });
    return { id, name, token };
  }

  @Post('auth/validate')
  @UseGuards(AuthJwtGuard)
  authValidate(@CurrentUser() user: UserEntity) {
    return user;
  }
}
