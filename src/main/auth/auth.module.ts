import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "src/utils/constant/jwtConstants";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),],
  providers:[AuthResolver, AuthService,JwtStrategy]
})
export class AuthModule {}