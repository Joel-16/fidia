import { Arg, Mutation, Resolver } from "type-graphql";
import {  verify} from 'jsonwebtoken'
import { User } from "../entity/User";

@Resolver()
export class VerificationResolver {
   @Mutation(() => String)
   async verify(@Arg('token') token: string): Promise<string> {
      let decoded = verify(token, `${process.env.JWT}`)
      if (typeof decoded != "string"){
         let user : any
         try{
            user = await User.findOne({where : {email : decoded.email}})            
            user.confirmed= true
            await user.save()
         } catch (e){
            throw new Error("account doesn't exist")
         }
      }
      return "Successful "
   }
}