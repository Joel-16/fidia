import { Arg, Mutation, Resolver } from "type-graphql";
import {  verify} from 'jsonwebtoken'
import { User } from "../entity/User";

@Resolver()
export class VerificationResolver {
   @Mutation(() => String)
   async verify(@Arg('token') token: string): Promise<string> {
      let decoded :any
      try{
         decoded = verify(token, `${process.env.JWT}`)
      }catch (err){
         throw new Error('Your token is expireed')
      }
      if (typeof decoded != "string"){
         try{
            await User.update({id : decoded.id}, {confirmed: true})            
         } catch (e){
            throw new Error("account doesn't exist")
         }
      }
      return "Successful "
   }
}