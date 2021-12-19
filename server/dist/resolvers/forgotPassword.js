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
exports.ForgotPasswordResolver = void 0;
const user_model_1 = require("../models/user.model");
const type_graphql_1 = require("type-graphql");
const sendEmail_1 = require("../utils/sendEmail");
const uuid_1 = require("uuid");
const constraints_1 = require("../constraints");
let ForgotPasswordResolver = class ForgotPasswordResolver {
    async forgotPassword(email, { req, redis }) {
        const _user = await user_model_1.user.findOne({ email });
        if (!_user) {
            return true;
        }
        const token = (0, uuid_1.v4)();
        await redis.set(constraints_1.FORGET_PASSWORD_PREFIX + token, _user.id, "ex", 1000 * 60 * 60 * 24 * 3);
        const html = `<a href="http://localhost:3000/change-password/${token}">reset password</a>`;
        await (0, sendEmail_1.sendEmail)(_user.email, html);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ForgotPasswordResolver.prototype, "forgotPassword", null);
ForgotPasswordResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ForgotPasswordResolver);
exports.ForgotPasswordResolver = ForgotPasswordResolver;
//# sourceMappingURL=forgotPassword.js.map