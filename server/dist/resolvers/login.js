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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResolver = void 0;
const user_gql_1 = require("../graphql/user.gql");
const user_model_1 = require("../models/user.model");
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let LoginResolver = class LoginResolver {
    async login(email, password, ctx) {
        const _user = await user_model_1.user.findOne({ email });
        if (!_user) {
            console.log("user not found");
            return null;
        }
        const valid = await bcryptjs_1.default.compare(password, _user.password);
        if (!valid) {
            console.log("wrong password");
            return null;
        }
        ctx.req.session.userId = _user.id;
        return _user;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => user_gql_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "login", null);
LoginResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], LoginResolver);
exports.LoginResolver = LoginResolver;
//# sourceMappingURL=login.js.map