// // src/auth/auth.controller.ts
// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { User } from '../user/user.entity';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   register(@Body() user: Omit<User, 'id'>): User {
//     return this.authService.register(user);
//   }

//   @Post('login')
//   login(@Body() body: { username: string; password: string }): User {
//     return this.authService.login(body.username, body.password);
//   }
// }
// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post('login')
login(@Body() body: { username: string, password: string }) {
  const user = this.authService.validateUser(body.username, body.password);
  if (!user) {
    throw new UnauthorizedException('Invalid username or password');
  }
  return this.authService.login(user); // No JWT used
}

}

