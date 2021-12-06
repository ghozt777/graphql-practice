"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const db_connect_1 = __importDefault(require("./config/db.connect"));
(0, db_connect_1.default)();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const posts_1 = require("./resolvers/posts");
const cat_1 = require("./resolvers/cat");
const main = async () => {
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, posts_1.PostResolver, cat_1.CatResolver],
            validate: false,
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(process.env.PORT, () => console.log("server is running ..."));
};
main();
//# sourceMappingURL=index.js.map