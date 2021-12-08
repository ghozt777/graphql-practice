import { user } from "../models/user.model";
import { User } from "../graphql/user.gql";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await user.find({});
    return users;
  }

  @Mutation(() => User)
  async register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const savedUser = new user({
      name,
      email,
      password: hashedPassword,
    }).save();
    return savedUser;
  }
}
