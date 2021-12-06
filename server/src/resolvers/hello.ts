import { Query, Resolver } from "type-graphql";

@Resolver() // decorator
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "Hello World !";
  }
}
