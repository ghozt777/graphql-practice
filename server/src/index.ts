require("dotenv").config();
import connectToDB from "./config/db.connect";
import cors from "cors";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/posts";
import { CatResolver } from "./resolvers/cat";
import { UserResolver } from "./resolvers/user";
import { LoginResolver } from "./resolvers/login";
import { MeResolver } from "./resolvers/me";
import { createClient } from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {
  connectToDB();
  const app = express();

  const RedisStore = connectRedis(session as any);
  const redisClient = createClient();

  app.use(
    session({
      name: "qid", // name of the cookie
      store: new RedisStore({ client: redisClient, disableTouch: true }) as any,
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        sameSite: "lax",
        httpOnly: true,
        secure: false,
      },
    })
  );

  app.use(
    cors({
      origin: "https://studio.apollographql.com",
      credentials: true,
    })
  );
  app.set("trust proxy", 1);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        PostResolver,
        CatResolver,
        UserResolver,
        LoginResolver,
        MeResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => console.log("server is running ..."));
};

main();
