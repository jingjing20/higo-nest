import { IQueryHandler, QueryHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export interface UserExistQueryParams {
  name: string;
}

export class UserExistQuery {
  constructor(public readonly params: UserExistQueryParams) {}
}

@QueryHandler(UserExistQuery)
export class UserExistQueryHandler implements IQueryHandler<UserExistQuery> {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(query: UserExistQuery) {
    const { name } = query.params;
    const result = await this.userRepository.find({
      where: { name },
      select: ['id', 'name'],
    });
    console.log(result, 'result');
    return result.length > 0;
  }
}
