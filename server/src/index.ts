import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import Redis from "ioredis";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import connectToDB from "./config/db.connect";
import { __prod__ } from "./constraints";
import { buildSchema } from "type-graphql";
import { MeResolver } from "./resolvers/me";
import { CatResolver } from "./resolvers/cat";
import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/posts";
import { DemoResolver } from "./resolvers/Demo";
import { LoginResolver } from "./resolvers/login";
import { HelloResolver } from "./resolvers/hello";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ForgotPasswordResolver } from "./resolvers/forgotPassword";

const main = async () => {
  connectToDB();
  const app = express();
  const RedisStore = connectRedis(session as any);
  const redis = new Redis();

  app.use(
    session({
      name: "qid", // name of the cookie
      store: new RedisStore({ client: redis, disableTouch: true }) as any,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string, // used to encrypt the cookie and then decrypt to get the original value
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        sameSite: "lax",
        httpOnly: true,
        secure: __prod__,
      },
    })
  );

  app.use(
    cors({
      origin: "http://localhost:3000",
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
        DemoResolver,
        ForgotPasswordResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res, redis }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false }); // cors here is set to false as we are manually handling it and dont need apollo to handle it
  // if we dont want the to use cors use can just use the one from apollo and set the origin to http://localhost:3000 or the client origin that will enable us to set cookie in the client browser
  app.listen(process.env.PORT, () =>
    console.log(
      `server is running on http://localhost:${process.env.PORT}/graphql`
    )
  );
};

main();
