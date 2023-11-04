import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(
  Strategy,
  'auth-local',
) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({ usernameField: 'name' }); // 这里的name和password对应请求体中的字段
  }

  async validate(name: string, password: string) {
    const [user] = await this.userRepository.find({ where: { name } });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    console.log('user', user);

    const isPasswordMatches = await bcrypt.compare(password, user.password);
    if (!isPasswordMatches) {
      throw new BadRequestException('密码错误');
    }

    return user;
  }
}
