// src/user/dto/create-user.dto.ts
import { IsString, IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(['admin', 'reviewer', 'dataentry'])
  role: 'admin' | 'reviewer' | 'dataentry';
}
