import { IsEmail, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 30) // adding validation
  name: string;

  @Field()
  @IsEmail() // making sure that the user gives a valid email
  email: string;

  @Field()
  @MinLength(8) // min length of the password
  password: string;
}
