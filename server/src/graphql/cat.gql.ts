import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Cat {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
