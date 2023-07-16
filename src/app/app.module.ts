import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './providers/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppCommonModule } from './modules/common/app-comon.module';
import { UserModule } from 'src/user/user.module';
import { AppNotificationModule } from './modules/notification/app-notification.module';
import { AuthModule } from 'src/auth/auth.module';
import { AppUploadModule } from './modules/upload/app-upload.module';
import appConfig from './configs/app.config';
import dbConfig from './configs/db.config';
import authConfig from 'src/auth/configs/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, authConfig],
    }),

    /**
     * 数据库
     */
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        synchronize: configService.get('typeOrm.synchronize'),
        autoLoadEntities: configService.get('typeOrm.autoLoadEntities'),
      }),
    }),

    AppCommonModule,
    UserModule,
    AppNotificationModule,
    AuthModule,
    AppUploadModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
