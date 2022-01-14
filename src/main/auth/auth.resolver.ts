import { Args, Mutation, Resolver,Query } from "@nestjs/graphql";
import { User } from "src/db/entities/user.entity";
import { LoginDto, RegisterDto, RegisterLoginResponse } from "../dto";
import { AuthService } from "./auth.service";

@Resolver()
export class AuthResolver {
    constructor(private readonly usersService: AuthService) {}

    @Mutation(() => User)
   async register(@Args('register') createUserData: RegisterDto): Promise <User> {
      return this.usersService.register(createUserData);
    }

    @Mutation(() => RegisterLoginResponse)
    async login(@Args('login') loginDto: LoginDto ): Promise <RegisterLoginResponse> {
      return this.usersService.login(loginDto)
    }

    @Query(() => String)
    sayHello(): string {
    return 'Hello World!';
  }


}