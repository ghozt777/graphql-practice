import { User } from "../graphql/user.gql";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types/myContext";
import { user } from "../models/user.model";

@Resolver()
export class MeResolver {
}