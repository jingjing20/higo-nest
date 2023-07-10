import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
  registerDecorator,
} from 'class-validator';
import { UserExistQuery } from '../queries/user-exist.query';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserNotExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly queryBus: QueryBus) {}

  async validate(value: string, args: ValidationArguments) {
    const result = await this.queryBus.execute(
      new UserExistQuery({ name: value }),
    );
    return !result;
  }

  defaultMessage(args: ValidationArguments) {
    return '用户已存在';
  }
}

export const UserNotExist = (options?: ValidatorOptions) => {
  return (object: object, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: UserNotExistValidator,
    });
};
