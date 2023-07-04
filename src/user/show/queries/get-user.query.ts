import { IQueryHandler, QueryHandler, EventBus } from '@nestjs/cqrs';

export interface GetUserQueryParams {
  id: number;
}

export class GetUserQuery {
  constructor(public readonly params: GetUserQueryParams) {}
}

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly eventBus: EventBus) {}

  async execute(query: GetUserQuery) {
    const { id } = query.params;
    return `query user ${id}`;
  }
}
