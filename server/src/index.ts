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
import connectRedis from "connect-redis";
import session from "express-session";
import { redis } from "./redis";
import { LoginResolver } from "./resolvers/login";
import { MeResolver } from "./resolvers/me";

const main = async () => {
  connectToDB();
  const app = express();

  app.use(
    cors({
      origin: "https://studio.apollographql.com",
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session as any);
  app.set("trust proxy", 1);
  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }) as any,
      name: "userId",
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
      cookie: {
        domain:
          process.env.NODE_ENV === "production"
            ? ".client-app.now.sh"
            : "localhost",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    })
  );

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
    context: ({ req }) => ({ req }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => console.log("server is running ..."));
};

main();
