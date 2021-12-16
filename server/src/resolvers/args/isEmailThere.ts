/**
 * Custom Validator to check if a user with the same email already exists
 */

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { user } from "../../models/user.model";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(email: string) {
    const isThere = await user.findOne({ email });
    if (!isThere) return true;
    else return false;
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}

@ValidatorConstraint({ async: true })
export class IsEmailRegisteredConstraint
  implements ValidatorConstraintInterface
{
  async validate(email: string) {
    const isThere = await user.findOne({ email });
    if (isThere) return true;
    else return false;
  }
}

export function IsEmailRegistered(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailRegisteredConstraint,
    });
  };
}
