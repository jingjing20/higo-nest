import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvatarEntity } from '../../../entities/avatar.entity';
import { GetUserAvatarQuery } from './get-user-avatar.query';

@QueryHandler(GetUserAvatarQuery)
export class GetUserAvatarQueryHandler
  implements IQueryHandler<GetUserAvatarQuery>
{
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(AvatarEntity)
    private readonly avatarRepository: Repository<AvatarEntity>,
  ) {}

  async execute(query: GetUserAvatarQuery) {
    const { userId } = query.params;
    const [avatar] = await this.avatarRepository.find({ where: { userId } });

    if (!avatar) {
      throw new NotFoundException('没找到用户头像');
    }

    return avatar;
  }
}
