import { PostType } from "src/config/types/posts.type";
import { Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class Post {
  @Field() // we dont need to mention the type for string and int as it is infered
  name: String;

  @Field()
  _id: number;

  @Field(() => Date) // for some datatype like Date we need to mention the type
  date: String;

  @Field(() => Boolean)
  flag: boolean;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Array<PostType> {
    return [
      {
        name: "This is a test",
        _id: 1234,
        date: new Date(),
        flag: false,
      },
    ];
  }
}
