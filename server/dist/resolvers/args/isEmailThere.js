"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmailRegistered = exports.IsEmailRegisteredConstraint = exports.IsEmailAlreadyExist = exports.IsEmailAlreadyExistConstraint = void 0;
const class_validator_1 = require("class-validator");
const user_model_1 = require("../../models/user.model");
let IsEmailAlreadyExistConstraint = class IsEmailAlreadyExistConstraint {
    async validate(email) {
        const isThere = await user_model_1.user.findOne({ email });
        if (!isThere)
            return true;
        else
            return false;
    }
};
IsEmailAlreadyExistConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsEmailAlreadyExistConstraint);
exports.IsEmailAlreadyExistConstraint = IsEmailAlreadyExistConstraint;
function IsEmailAlreadyExist(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}
exports.IsEmailAlreadyExist = IsEmailAlreadyExist;
let IsEmailRegisteredConstraint = class IsEmailRegisteredConstraint {
    async validate(email) {
        const isThere = await user_model_1.user.findOne({ email });
        if (isThere)
            return true;
        else
            return false;
    }
};
IsEmailRegisteredConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsEmailRegisteredConstraint);
exports.IsEmailRegisteredConstraint = IsEmailRegisteredConstraint;
function IsEmailRegistered(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailRegisteredConstraint,
        });
    };
}
exports.IsEmailRegistered = IsEmailRegistered;
//# sourceMappingURL=isEmailThere.js.map