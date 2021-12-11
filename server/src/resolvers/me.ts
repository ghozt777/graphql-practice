import { User } from "../graphql/user.gql";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types/myContext";
import { user } from "../models/user.model";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    const id = ctx.req.session.userId;
    try {
      const me = await user.findById(id);
      return me;
    } catch (e) {
      let message = "Unknown Error !";
      if (e instanceof Error) message = "error : " + e.message;
      console.error(message);
      return null;
    }
  }
}
