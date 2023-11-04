import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
  registerDecorator,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserNotExistValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validate(value: string, args: ValidationArguments) {
    const result = await this.userRepository.find({
      where: { name: value },
      select: ['id', 'name'],
    });
    console.log(result, 'result');
    console.log(args, 'ValidationArguments');
    return !(result.length > 0);
  }

  defaultMessage(args: ValidationArguments) {
    console.log(args, 'ValidationArguments');
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
