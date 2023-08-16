import { forwardRef, Module } from '@nestjs/common';
import { AvatarModule } from '../../avatar.module';
import { CreateAvatarCommandHandler } from './commands/create-avatar.command';

@Module({
  providers: [CreateAvatarCommandHandler],
  imports: [forwardRef(() => AvatarModule)],
})
export class AvatarCreateModule {}
