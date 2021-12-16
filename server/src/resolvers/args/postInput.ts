import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailRegistered } from "./isEmailThere";

@InputType()
export class PostInput {
  @Field()
  @IsEmail()
  @IsEmailRegistered({ message: "Email Not Registered" })
  email: string;

  @Field()
  title: string;

  @Field()
  content: string;
}
