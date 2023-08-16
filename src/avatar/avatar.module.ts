import { Module } from '@nestjs/common';
import { AvatarController } from './controllers/avatar.controller';
import { AppUploadModule } from 'src/app/modules/upload/app-upload.module';
import { AvatarEntitySubscriber } from './entities/avatar.entity.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarEntity } from './entities/avatar.entity';
import { AvatarCreateModule } from './modules/create/avatar-create.module';

@Module({
  controllers: [AvatarController],
  imports: [
    AppUploadModule.register({ destination: 'upload.avatar' }),
    TypeOrmModule.forFeature([AvatarEntity]),
    AvatarCreateModule,
  ],
  providers: [AvatarEntitySubscriber],
})
export class AvatarModule {}
