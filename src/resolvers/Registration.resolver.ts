import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { genSaltSync, hashSync, compareSync } from "bcryptjs"
import { UserInputError } from "apollo-server-express";
import { sign } from 'jsonwebtoken'
import { User } from "../entity/User";
import { LoginInput, RegisterInput } from "../inputTypes/register.input"
import { loginReturn } from "../returnTypes/loginReturn";
import { sendmail } from "../utils/sendMail";

@Resolver()
export class RegisterResolver {
   @Mutation(() => User)
   async registration(@Arg('data') { country, email, mobile, name, password }: RegisterInput): Promise<User> {
      let salt = genSaltSync(10)
      password = hashSync(password, salt)
      if (await User.findOne({ email: email })) {
         throw new UserInputError(`Account with ${email} already exist. Please try another email`)
      } else {
         let user = User.create({
            country: country,
            mobile: mobile,
            email: email,
            password: password,
            name: name,
            confirmed: false
         })
         await user.save()
         await sendmail(user.email,sign({id: user.id}, `${process.env.JWT}`, { expiresIn: 900000 }) )
      return user
   }
}


@Query(() => [User])
async allUsers() {
   return await User.find({})
}
}

@Resolver()
export class LoginResolver {
   @Mutation(() => loginReturn)
   async login(@Arg('data') { email, password }: LoginInput): Promise<loginReturn> {
      let user
      try {
         user = await User.findOneOrFail({ email })
      } catch (e) {
         throw new Error("Account doesn't exist")
      }
      if (!compareSync(password, user.password)) {
         throw new UserInputError("Password is incorrect")
      }
      if (!user.confirmed) {
         throw new Error("Please Verify your email address")
      }
      let token = { id: user.id, email: user.email }
      return { token: sign(token, `${process.env.JWT}`, { expiresIn: '1h' }), user: user }

   }

}
