import { User } from "../entity/User";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class loginReturn{
   @Field()
   token : string

   @Field()
   user : User
}