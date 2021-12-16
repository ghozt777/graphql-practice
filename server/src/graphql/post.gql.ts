import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user.gql";

@ObjectType()
export class Post {
  @Field() // we dont need to mention the type for string and int as it is infered
  title: String;

  @Field(() => ID)
  _id: String;

  @Field(() => User)
  author: User;

  @Field()
  content: String;
}
