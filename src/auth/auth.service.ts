// // src/auth/auth.service.ts
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import { User } from '../user/user.entity';

// @Injectable()
// export class AuthService {
//   constructor(private readonly userService: UserService) {}

//   register(user: Omit<User, 'id'>): User {
//     return this.userService.create(user);
//   }

//   login(username: string, password: string): User {
//     const user = this.userService.findByUsername(username);
//     if (!user || user.password !== password) {
//       throw new UnauthorizedException('Invalid username or password');
//     }
//     return user;
//   }
// }
// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  validateUser(username: string, password: string): User | null {
    const user = this.userService.findAll().find(
      (u) => u.username === username && u.password === password
    );
    return user || null;
  }

  login(user: User) {
    return {
      username: user.username,
      role: user.role
    };
  }
}
