import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AvatarInterceptor } from '../interceptors/avatar.interceptor';
import { AuthJwtGuard } from 'src/auth/modules/jwt/guards/auth-jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAvatarCommand } from '../modules/create/commands/create-avatar.command';

@Controller()
export class AvatarController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('avatar')
  @UseGuards(AuthJwtGuard)
  @UseInterceptors(AvatarInterceptor)
  createAvatar(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserEntity,
  ) {
    console.log(file, 'file');
    const { mimetype, filename, size } = file;

    return this.commandBus.execute(
      new CreateAvatarCommand({
        mimetype,
        filename,
        size,
        userId: user.id,
      }),
    );
  }
}
