import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsIn,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';
import { ROLE } from 'src/db/entities/user.entity';

const passwordRegex = new RegExp('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
const passwordMessage = 'Password must have at least 8 character, including number, letter and special characters'

@InputType()
export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @Matches(passwordRegex, {
    message: passwordMessage
  })
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  //@IsIn([ROLE.ADMIN, ROLE.SUPERADMIN, ROLE.USER])
  roleName: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @Matches(passwordRegex, {
    message: passwordMessage
  })
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIn([ROLE.ADMIN, ROLE.SUPERADMIN, ROLE.USER])
  roleName?: ROLE;
}

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @Matches(passwordRegex, {
    message: passwordMessage
  } )
  password: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}


export class createRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @Matches(passwordRegex, {
    message: passwordMessage
  })
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  resetPasswordToken: string;
}

@ObjectType()
export class UserData {
  @Field(() => Int)
  id?: number

  @Field()
  email?: string

  @Field()
  firstName?: string

  @Field()
  lastName?: string

  @Field()
  scope: string 
}
  @ObjectType()
export class RegisterLoginResponse {
  @Field(() => UserData)
  user: UserData
  
  @Field()
  accessToken: string

  @Field()
  refreshToken: string
}


