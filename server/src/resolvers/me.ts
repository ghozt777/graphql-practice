import { User } from "../graphql/user.gql";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types/myContext";
import { user } from "../models/user.model";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext) {
    console.log(ctx.req.session!.userId);
    if (!ctx.req.session!.userId) return null;
    return await user.findById(ctx.req.session!.userId);
  }
}
