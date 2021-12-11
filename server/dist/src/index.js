"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const db_connect_1 = __importDefault(require("./config/db.connect"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const posts_1 = require("./resolvers/posts");
const cat_1 = require("./resolvers/cat");
const user_1 = require("./resolvers/user");
const login_1 = require("./resolvers/login");
const me_1 = require("./resolvers/me");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const apollo_server_core_1 = require("apollo-server-core");
const main = async () => {
    (0, db_connect_1.default)();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use((0, express_session_1.default)({
        name: "qid",
        store: new RedisStore({ client: redis, disableTouch: true }),
        saveUninitialized: false,
        secret: "keyboard cat",
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            sameSite: "lax",
            httpOnly: true,
            secure: false,
        },
    }));
    app.use((0, cors_1.default)({
        origin: "https://studio.apollographql.com",
        credentials: true,
    }));
    app.set("trust proxy", 1);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [
                hello_1.HelloResolver,
                posts_1.PostResolver,
                cat_1.CatResolver,
                user_1.UserResolver,
                login_1.LoginResolver,
                me_1.MeResolver,
            ],
        }),
        context: ({ req, res }) => ({ req, res }),
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)({}),
        ],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(process.env.PORT, () => console.log("server is running ..."));
};
main();
//# sourceMappingURL=index.js.map