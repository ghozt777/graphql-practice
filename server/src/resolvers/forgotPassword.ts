import { user } from "../models/user.model";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "../types/myContext";
@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string, @Ctx() { req }: MyContext) {
    const _user = await user.findOne({ email });
    
  }
}
