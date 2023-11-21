import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ClientSetupState } from 'src/entities/internal/instance.entity';

registerEnumType(ClientSetupState, {
  name: 'ClientSetupState',
  description: 'Represents the setup state of the client',
  valuesMap: {
    INITIAL: {
      description:
        'User has entered the token, the initial entry was saved to facilitate resuming and further validation',
    },
    VALUES: {
      description: 'The user has entered neccesarry settings on the dev portal',
    },
    COMPLETE: {
      description:
        'The instance has finished setup and is ready to login and be used',
    },
  },
});

@ObjectType({
  description: 'Represents a client instance belonging to a WebUser',
})
export class UserInstance {
  @Field({ description: "The instance's ID" })
  id: string;

  @Field({ description: "The instance's client ID" })
  clientId: string;

  @Field(() => ClientSetupState, {
    description: 'The setup state of the instance',
  })
  setupState: ClientSetupState;
}
