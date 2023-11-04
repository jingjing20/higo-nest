import { Module } from '@nestjs/common';
import { AvatarController } from './controllers/avatar.controller';
import { AppUploadModule } from 'src/app/modules/upload/app-upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarEntity } from './entities/avatar.entity';
import { AvatarServeModule } from './modules/serve/avatar-serve.module';

@Module({
  controllers: [AvatarController],
  imports: [
    AppUploadModule.register({ destination: 'upload.avatar' }),
    TypeOrmModule.forFeature([AvatarEntity]),
    AvatarServeModule,
  ],
  exports: [TypeOrmModule],
})
export class AvatarModule {}
