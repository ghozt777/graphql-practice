import { User } from "../graphql/user.gql";
import { user } from "../models/user.model";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { MyContext } from "src/types/myContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const _user = await user.findOne({ email });
    if (!_user) {
      console.log("user not found");
      return null;
    }
    const valid = await bcrypt.compare(password, _user.password);
    if (!valid) {
      console.log("wrong password");
      return null;
    }
    ctx.req.session.userId = _user.id;
    return _user;
  }
}
