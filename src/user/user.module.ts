import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateModule } from './modules/create/user-create.module';
import { UserEntitySubscriber } from './entities/user.entity.subscriber';
import { UserEntity } from './entities/user.entity';
import { UserSaga } from './sagas/user.saga';
import { UserShowModule } from './modules/show/user-show.module';
import { UserNotExistValidator } from './validators/user-not-exist.validator';
import { UserExistQueryHandler } from './queries/user-exist.query';

@Module({
  imports: [
    UserCreateModule,
    TypeOrmModule.forFeature([UserEntity]),
    UserShowModule,
  ],
  providers: [
    UserEntitySubscriber,
    UserSaga,
    UserNotExistValidator,
    UserExistQueryHandler,
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
