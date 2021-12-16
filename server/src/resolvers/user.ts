import { user } from "../models/user.model";
import { User } from "../graphql/user.gql";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import bcrypt from "bcryptjs";
import { RegisterInput } from "./args/registerInput";
import { MyContext } from "src/types/myContext";

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

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext) {
    return new Promise((res) =>
      ctx.req.session.destroy((err) => {
        // clear the session from the redis server
        ctx.res.clearCookie("qid"); // clear the cookie from the client as well even if its not deleted from the redis server
        if (err) {
          console.log(err);
          res(false);
        } else res(true);
      })
    );
  }
}
