import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
@Controller('user-create')
export class UserCreateController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    console.log('Controller createUser');
    const user = await this.userRepository.save(body);
    return {
      insertId: user.id,
    };
  }
}
