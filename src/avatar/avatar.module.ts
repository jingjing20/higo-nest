import { Module } from '@nestjs/common';
import { AvatarController } from './controllers/avatar.controller';
import { AppUploadModule } from 'src/app/modules/upload/app-upload.module';

@Module({
  controllers: [AvatarController],
  imports: [AppUploadModule],
})
export class AvatarModule {}
