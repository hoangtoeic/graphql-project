import { Injectable } from "@nestjs/common"
import { User } from "src/db/entities/user.entity"
import { LoginDto, RegisterDto, RegisterLoginResponse, UserData } from "../dto"

@Injectable()
export class AuthService {
    
   async register(createUserData: RegisterDto): Promise<User> {
       console.log(createUserData)
      const user =new User() 
      user.id = 1
      user.email = createUserData.email,
      user.firstName = createUserData.firstName
      user.lastName =  createUserData.lastName
      user.password = createUserData.password
      return user
    }

    async login(loginDto: LoginDto): Promise<RegisterLoginResponse> {

      console.log(loginDto)
      const userData = await new UserData()
      userData.email = loginDto.email
      userData.scope = "Admin"
      userData.firstName = "firstname"
      userData.lastName = "lastname"
      userData.id = 5
      
      const registerLoginResponse = new RegisterLoginResponse() 
      registerLoginResponse.user = userData
      registerLoginResponse.accessToken = "accessToken"
      registerLoginResponse.refreshToken = "refreshToken" 
      
      console.log()
      return registerLoginResponse
  
    }
  }