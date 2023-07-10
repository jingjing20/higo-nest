import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCreatedEvent } from '../modules/create/events/user-created.event';
import { SendMessageCommand } from 'src/app/modules/notification/commands/send-message.command';

@Injectable()
export class UserSaga {
  @Saga()
  sendMessageWhenUserCreated(events$: Observable<any>) {
    return events$.pipe(
      ofType(UserCreatedEvent), // filter events
      map(
        (event) =>
          new SendMessageCommand({ message: `welcome ${event.params.name}` }),
      ),
    );
  }
}
