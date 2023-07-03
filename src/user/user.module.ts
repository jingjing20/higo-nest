import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCreateModule } from './create/user-create.module';
import { UserEntitySubscriber } from './entities/user.entity.subscriber';
import { UserEntity } from './entities/user.entity';
import { UserSaga } from './sagas/user.saga';
import { UserShowModule } from './show/user-show.module';

@Module({
  imports: [
    UserCreateModule,
    TypeOrmModule.forFeature([UserEntity]),
    UserShowModule,
  ],
  providers: [UserEntitySubscriber, UserSaga],
  exports: [TypeOrmModule],
})
export class UserModule {}
