import { Args, Mutation, Resolver,Query } from "@nestjs/graphql";
import { User } from "src/db/entities/user.entity";
import { RegisterDto } from "../dto";
import { AuthService } from "./auth.service";

@Resolver()
export class AuthResolver {
    constructor(private readonly usersService: AuthService) {}

    @Mutation(() => User)
   async register(@Args('createUserData') createUserData: RegisterDto): Promise <User> {
        return this.usersService.register(createUserData);
    }

    @Query(() => String)
    sayHello(): string {
    return 'Hello World!';
  }


}