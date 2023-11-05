import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateModule } from './modules/create/user-create.module';
import { UserEntitySubscriber } from './entities/user.entity.subscriber';
import { UserEntity } from './entities/user.entity';
import { UserShowModule } from './modules/show/user-show.module';
import { UserNotExistValidator } from './validators/user-not-exist.validator';

@Module({
  imports: [
    UserCreateModule,
    TypeOrmModule.forFeature([UserEntity]),
    UserShowModule,
  ],
  providers: [UserEntitySubscriber, UserNotExistValidator],
  exports: [TypeOrmModule],
})
export class UserModule {}
