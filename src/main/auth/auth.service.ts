import { Injectable } from "@nestjs/common"
import { User } from "src/db/entities/user.entity"
import { RegisterDto } from "../dto"

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
  }