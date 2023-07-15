import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUserCredentialCommand } from '../commands/validate-user-credential.command';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(
  Strategy,
  'auth-local',
) {
  constructor(private readonly commandBus: CommandBus) {
    super({ usernameField: 'name' }); // 这里的name和password对应请求体中的字段
  }

  validate(name: string, password: string) {
    return this.commandBus.execute(
      new ValidateUserCredentialCommand({ name, password }),
    );
  }
}
