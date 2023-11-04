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
import { InjectRepository } from '@nestjs/typeorm';
import { AvatarEntity } from 'src/avatar/entities/avatar.entity';
import { Repository } from 'typeorm';
@Controller()
export class AvatarController {
  constructor(
    @InjectRepository(AvatarEntity)
    private readonly avatarRepository: Repository<AvatarEntity>,
  ) {}
  @Post('avatar')
  @UseGuards(AuthJwtGuard)
  @UseInterceptors(AvatarInterceptor)
  createAvatar(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserEntity,
  ) {
    console.log(file, 'file');
    const { mimetype, filename, size } = file;
    return this.avatarRepository.save({
      mimetype,
      filename,
      size,
      userId: user.id,
    });
  }
}
