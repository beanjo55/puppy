import { Resolver, Query } from '@nestjs/graphql';
import { UserInstance } from './userInstances.model';
import { GQLCookie } from 'src/decorators/cookie.decorator';
import { UserInstancesService } from './userInstances.service';

@Resolver(() => UserInstance)
export class UserInstanceResolver {
  constructor(private userInstancesService: UserInstancesService) {}

  @Query(() => [UserInstance], { name: 'userInstances' })
  getInstances(@GQLCookie('user') userId: string) {
    return this.userInstancesService.findAllByUser(userId);
  }
}
