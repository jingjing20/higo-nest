import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

export interface UserCreatedEventParams {
  name: string;
}

export class UserCreatedEvent {
  constructor(public readonly params: UserCreatedEventParams) {}
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  handle(event: UserCreatedEvent) {
    const { name } = event.params;
    console.log(`user ${name} has been created.`);
    return event;
  }
}
