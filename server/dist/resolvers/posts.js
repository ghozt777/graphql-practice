"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const post_model_1 = require("../models/post.model");
const user_model_1 = require("../models/user.model");
const postInput_1 = require("./args/postInput");
const post_gql_1 = require("../graphql/post.gql");
let PostResolver = class PostResolver {
    async posts() {
        const posts = await post_model_1.post.find({}).populate({
            path: "author",
            select: "_id name email",
        });
        return posts;
    }
    async createPost({ email, title, content }) {
        try {
            const foundUser = await user_model_1.user.findOne({ email });
            await new post_model_1.post({
                title,
                content,
                author: foundUser,
            }).save();
            return true;
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [post_gql_1.Post], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [postInput_1.PostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=posts.js.map