import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class DemoResolver {
  @Mutation(() => String)
  getLaid(@Arg("name") name: string): string {
    return name + "sike u aint never gettin laid bitch !";
  }
}
