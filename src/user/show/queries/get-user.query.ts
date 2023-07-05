import { IQueryHandler, QueryHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

export interface GetUserQueryParams {
  id: number;
}

export class GetUserQuery {
  constructor(public readonly params: GetUserQueryParams) {}
}

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(query: GetUserQuery) {
    const { id } = query.params;
    const res = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name'])
      .where('user.id=:userId', { userId: id })
      .getOne();
    return res ? res : 'no info';
  }
}
