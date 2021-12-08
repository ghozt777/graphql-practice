import { user } from "../models/user.model";
import { User } from "../graphql/user.gql";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { RegisterInput } from "./args/registerInput";

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
