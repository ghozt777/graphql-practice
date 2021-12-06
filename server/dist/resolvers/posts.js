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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
let Post = class Post {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Post.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    __metadata("design:type", String)
], Post.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Post.prototype, "flag", void 0);
Post = __decorate([
    (0, type_graphql_1.ObjectType)()
], Post);
let PostResolver = class PostResolver {
    posts() {
        return [
            {
                name: "This is a test",
                _id: 1234,
                date: new Date(),
                flag: false,
            },
        ];
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], PostResolver.prototype, "posts", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=posts.js.map