import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(
  Strategy,
  'auth-local',
) {
  constructor() {
    super({ usernameField: 'name', passwordField: 'password' }); // 这里的name和password对应请求体中的字段
  }

  validate(name: string, password: string) {
    return { name, password }; // 这里返回的对象会被赋值给请求对象的 user 属性
  }
}
