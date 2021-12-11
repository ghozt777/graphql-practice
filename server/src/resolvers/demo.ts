import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class DemoResolver {
  @Mutation(() => String)
  getLaid(@Arg("name") name: string): string {
    return "sike u aint ever gettin laid bitch !";
  }
}
