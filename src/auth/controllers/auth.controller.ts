import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from '../modules/local/guards/auth-local.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller()
export class AuthController {
  @Post('login')
  @UseGuards(AuthLocalGuard)
  login(@CurrentUser() user: UserEntity) {
    return user;
  }
}
