import {
  Arg,
  Mutation,
  Resolver,
  Query,
} from "type-graphql";
import { cat } from "../models/cat.model";
import { Cat } from '../graphql/cat.gql'

@Resolver()
export class CatResolver {
  @Mutation(() => Cat)
  async createCat(@Arg("name") name: string) {
    const createdCat = new cat({ name });
    const savedCat = await createdCat.save();
    return savedCat;
  }

  @Query(() => [Cat])
  async getCats() {
    const cats = await cat.find({});
    return cats;
  }
}
