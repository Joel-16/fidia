import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
   @Field()
   name : string

   @Field()
   @IsEmail()
   email : string

   @Field()
   country : string

   @Field()
   mobile : string

   @Field()
   password : string
}

@InputType()
export class LoginInput {
   @Field()
   password : string

   @Field()
   @IsEmail()
   email : string
}