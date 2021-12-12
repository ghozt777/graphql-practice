import { user } from "../models/user.model";
import { User } from "../graphql/user.gql";
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { RegisterInput } from "./args/registerInput";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await user.find({});
    return users;
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { name, email, password }: RegisterInput
  ): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const savedUser = new user({
      name,
      email,
      password: hashedPassword,
    }).save();
    return savedUser;
  }
}
