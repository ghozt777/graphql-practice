import { User } from "../graphql/user.gql";
import { user } from "../models/user.model";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { MyContext } from "../types/myContext";
import { FORGET_PASSWORD_PREFIX } from "../constraints";
import { isJWT } from "class-validator";

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
  errors?: [FieldError];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    const _user = await user.findOne(
      usernameOrEmail.includes("@")
        ? {
            email: usernameOrEmail,
          }
        : {
            name: usernameOrEmail,
          }
    );
    if (!_user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: usernameOrEmail.includes("@")
              ? `email : ${usernameOrEmail} is not registered`
              : `username : ${usernameOrEmail} is not registered`,
          },
        ],
      };
    }
    const valid = await bcrypt.compare(password, _user.password);
    if (!valid) {
      console.log("wrong password");
      return {
        errors: [
          {
            field: "password",
            message: "wrong password !",
          },
        ],
      };
    }
    ctx.req.session.userId = _user.id;
    return {
      user: _user,
    };
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis }: MyContext
  ): Promise<UserResponse> {
    const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired !",
          },
        ],
      };
    }

    const _user = await user.findById(userId);
    if (!_user) {
      return {
        errors: [
          {
            field: "token",
            message: "user dosen't exsist",
          },
        ],
      };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    _user.password = hashedPassword;
    return {
      user: await _user.save(),
    };
  }
}
