import { Response } from 'express';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { AvatarServeService } from '../providers/avatar-serve.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvatarEntity } from 'src/avatar/entities/avatar.entity';
@Controller()
export class AvatarServeController {
  constructor(
    private readonly avatarServeService: AvatarServeService,
    @InjectRepository(AvatarEntity)
    private readonly avatarRepository: Repository<AvatarEntity>,
  ) {}

  @Get('/avatar/:userId')
  async serveAvatar(
    @Param('userId', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const [avatar] = await this.avatarRepository.find({ where: { userId } });
    if (!avatar) {
      throw new NotFoundException('没找到用户头像');
    }

    const avatarStream = this.avatarServeService.getUserAvatarStream(
      avatar.filename,
    );
    response.set({
      'Content-Type': avatar.mimetype,
    });
    return new StreamableFile(avatarStream);
  }
}
