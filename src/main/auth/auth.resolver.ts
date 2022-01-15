import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver,Query } from "@nestjs/graphql";
import { User } from "src/db/entities/user.entity";
import { ForgotPasswordDto, ForgotPasswordResponse, LoginDto, RefreshTokenDto, RefreshTokenResponse, RegisterDto, RegisterLoginResponse, ResetPasswordDto, ResetPasswordResponse } from "../dto";
import { AuthService } from "./auth.service";
import { Roles } from "./decorator/roles.decorator";
import { JwtAuthGuard } from "./middleware/jwt-auth.guard";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => RegisterLoginResponse)
   async register(@Args('register') createUserData: RegisterDto): Promise <RegisterLoginResponse> {
      return this.authService.register(createUserData);
    }

    @Mutation(() => RegisterLoginResponse)
    async login(@Args('login') loginDto: LoginDto ): Promise <RegisterLoginResponse> {
      return this.authService.login(loginDto)
    }

    @Mutation(() => RefreshTokenResponse)
    async refreshToken(@Args('refreshToken') refreshTokenDto: RefreshTokenDto): Promise <RefreshTokenResponse> {
      return this.authService.refreshToken(refreshTokenDto);
    }

    @Mutation(() => ForgotPasswordResponse)
    async forgotPassword(@Args('forgotPassword') forgotPasswordDto: ForgotPasswordDto): Promise <ForgotPasswordResponse> {
      return this.authService.forgotPassword(forgotPasswordDto)
    }

    @Mutation(() => ResetPasswordResponse)
    async resetPassword(@Args('resetPassword') resetPassword: ResetPasswordDto): Promise <ResetPasswordResponse> {
      return this.authService.resetPassword(resetPassword)
    }

    @Query(() => RegisterLoginResponse)
    @Roles('ADMIN', 'SUPERADMIN')
    @UseGuards(JwtAuthGuard)
    async testAuthen(): Promise<RegisterLoginResponse> {
      return this.authService.testAuthen();
  }
}