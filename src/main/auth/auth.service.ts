import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/db/entities/user.entity';
import { jwtConstants } from 'src/utils/constant/jwtConstants';
import { LoginDto, RegisterDto, RegisterLoginResponse, UserData } from '../dto';

@Injectable()
export class AuthService {
  constructor(private jwtServive: JwtService) {}
  async register(createUserData: RegisterDto): Promise<User> {
    console.log(createUserData);
    const user = new User();
    user.id = 1;
    (user.email = createUserData.email),
      (user.firstName = createUserData.firstName);
    user.lastName = createUserData.lastName;
    user.password = createUserData.password;
    return user;
  }

  async login(loginDto: LoginDto): Promise<RegisterLoginResponse> {
    console.log(loginDto);
    const userData = await new UserData();
    userData.email = loginDto.email;
    userData.scope = 'ADMIN';
    userData.firstName = 'firstname';
    userData.lastName = 'lastname';
    userData.id = 5;

    const registerLoginResponse = new RegisterLoginResponse();
    const payload = registerLoginResponse;
    registerLoginResponse.user = userData;
    registerLoginResponse.accessToken = this.jwtServive.sign({ user: payload }); // 1 week
    registerLoginResponse.refreshToken = 'refreshToken';

    return registerLoginResponse;
  }

  async testAuthen(): Promise<RegisterLoginResponse> {
    const userData = await new UserData();
    userData.email = 'new';
    userData.scope = 'ADMIN';
    userData.firstName = 'firstname';
    userData.lastName = 'lastname';
    userData.id = 5;

    const registerLoginResponse = new RegisterLoginResponse();
    const payload = registerLoginResponse;
    registerLoginResponse.user = userData;
    registerLoginResponse.accessToken = this.jwtServive.sign({ user: payload });
    registerLoginResponse.refreshToken = 'refreshToken';

    return registerLoginResponse;
  }
}
