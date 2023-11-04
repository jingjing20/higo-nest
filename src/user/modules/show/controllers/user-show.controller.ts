import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
@Controller('user-show')
export class UserShowController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    const res = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name'])
      .where('user.id=:userId', { userId })
      .getOne();
    return res ? res : 'no info';
  }
}
