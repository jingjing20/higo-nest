import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Global()
@Module({
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true, // remove non-whitelisted properties
          stopAtFirstError: true, // stop at first error
        }),
    },
  ],
})
export class AppCommonModule {}
