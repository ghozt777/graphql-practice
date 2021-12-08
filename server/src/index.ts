require("dotenv").config();
import connectToDB from "./config/db.connect";

import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/posts";
import { CatResolver } from "./resolvers/cat";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  connectToDB();
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, CatResolver, UserResolver],
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT, () => console.log("server is running ..."));
};

main();
