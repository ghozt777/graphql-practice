import { User } from "../graphql/user.gql";
import {
  Arg,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { post } from "../models/post.model";
import { user } from "../models/user.model";
import { PostInput } from "./args/postInput";
import { Post } from "../graphql/post.gql";
// import { sleep } from "../utils/sleep";

@Resolver()
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts() {
    // await sleep(3000); // creating an artificial delay
    const posts = await post.find({}).populate({
      path: "author",
      select: "_id name email",
    });
    return posts;
  }

  @Mutation(() => Boolean, { nullable: true })
  async createPost(@Arg("data") { email, title, content }: PostInput) {
    try {
      const foundUser = await user.findOne({ email });
      await new post({
        title,
        content,
        author: foundUser,
      }).save();
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }
}
