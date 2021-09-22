import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  lastName: string;
    
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  profile: string;

  @IsOptional()
  description: string;

  @IsOptional()
  hobby: string;
  
  @IsNotEmpty()
  password: string;

  @IsOptional()
  role: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  lastName: string;
    
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  profile: string;

  @IsOptional()
  description: string;

  @IsOptional()
  hobby: string;
} 
