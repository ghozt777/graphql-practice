import { IsEmail, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailThere";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 30, {
    message: "Can't create a name with less than 1 word or more than 30 words",
  }) // adding validation
  name: string;

  @Field()
  @IsEmail() // making sure that the user gives a valid email
  @IsEmailAlreadyExist({ message: "email already is use" }) // using the custom validator
  email: string;

  @Field()
  @MinLength(8, {
    message: "Passwords with less than 8 letters not allowed",
  }) // min length of the password
  password: string;
}
