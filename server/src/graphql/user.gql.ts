import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  // we dont want to exponse the passwords to the user hence we are not setting it as a field so that it can't be queried
  password: string;
}
