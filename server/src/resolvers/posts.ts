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

const sleep = (ms: number) => new Promise((res, _) => setTimeout(res, ms));

@ObjectType()
class Post {
  @Field() // we dont need to mention the type for string and int as it is infered
  title: String;

  @Field(() => ID)
  _id: String;

  @Field(() => User)
  author: User;

  @Field()
  content: String;
}

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
