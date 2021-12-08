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
exports.CatResolver = void 0;
const type_graphql_1 = require("type-graphql");
const cat_model_1 = require("../models/cat.model");
const cat_gql_1 = require("../graphql/cat.gql");
let CatResolver = class CatResolver {
    async createCat(name) {
        const createdCat = new cat_model_1.cat({ name });
        const savedCat = await createdCat.save();
        return savedCat;
    }
    async getCats() {
        const cats = await cat_model_1.cat.find({});
        return cats;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => cat_gql_1.Cat),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatResolver.prototype, "createCat", null);
__decorate([
    (0, type_graphql_1.Query)(() => [cat_gql_1.Cat]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatResolver.prototype, "getCats", null);
CatResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CatResolver);
exports.CatResolver = CatResolver;
//# sourceMappingURL=cat.js.map