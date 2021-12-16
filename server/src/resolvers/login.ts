import { User } from "../graphql/user.gql";
import { user } from "../models/user.model";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
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
  errors?: [FieldError];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    const _user = await user.findOne({ email });
    if (!_user) {
      return {
        errors: [
          {
            field: "email",
            message: `email : ${email} dosen't exists`,
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
}
