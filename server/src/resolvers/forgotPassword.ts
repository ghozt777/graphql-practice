import { user } from "../models/user.model";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "../types/myContext";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { FORGET_PASSWORD_PREFIX } from "../constraints";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { req, redis }: MyContext
  ) {
    const _user = await user.findOne({ email });
    if (!_user) {
      // user is not registered
      return true; // this is to prevent anyone to phish for emials so we dont tell the user that email is not there
    }

    // we can use JWT to authenticate the user and generate a token , but since a JWT is valid for atleast a certai amount of time
    // the user can thecnicaly reset the password as may times in that time span which is undesirable
    // so to fix this uuid can be used to generate a token and then store it in redis and then clear it once its used
    // so by this way we make sure that the user can reset the password only once per email

    const token = v4();

    // we are going to use the token to get the userid of the user
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      _user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); // valid for 3 days

    const html = `<a href="http://localhost:3000/change-password/${token}">reset password</a>`;
    await sendEmail(_user.email, html);
    return true;
  }
}
