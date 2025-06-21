// import { Injectable, NotFoundException } from '@nestjs/common';
// import { User } from './user.entity';
// import * as bcrypt from 'bcryptjs';
// @Injectable()
// export class UserService {
//   private users: User[] = [];
//   private idCounter = 1;

// // create(username: string, password: string, role: 'admin' | 'reviewer' | 'dataentry'): User {
// //   const newUser: User = {
// //     id: this.idCounter++,
// //     username,
// //     password,
// //     role,
// //     createdAt: new Date(),
// //     fullName: ''
// //   };

// //   this.users.push(newUser);

// //   // Return a copy excluding the password for safety
// //   const { password: _, ...safeUser } = newUser;
// //   return safeUser as User;
// // }

// create(username: string, password: string, role: 'admin' | 'reviewer' | 'dataentry'): User {
//   const hashedPassword = bcrypt.hashSync(password, 10); // ✅ MUST HASH
//   const newUser: User = {
//     id: this.idCounter++,
//     username,
//     password: hashedPassword, // ✅ store hashed password
//     role,
//     createdAt: new Date(),
//     fullName: ''
//   };
//   this.users.push(newUser);
//   return newUser;
// }

//   findAll(): User[] {
//     return this.users;
//   }

//   findOne(id: number): User | undefined {
//     return this.users.find(user => user.id === id);
//   }
// findByUsername(username: string): User | undefined {
//   return this.users.find(user => user.username === username);
// }


//   delete(id: number): void {
//     const index = this.users.findIndex(user => user.id === id);
//     if (index === -1) {
//       throw new NotFoundException(`User ${id} not found`);
//     }
//     this.users.splice(index, 1);
//   }
// }

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  create(username: string, password: string, role: 'admin' | 'reviewer' | 'dataentry'): User {
    
    const newUser: User = {
      id: this.idCounter++,
      username,
      password,
      role,
      createdAt: new Date(),
      fullName: '',
    };
    this.users.push(newUser);
    return newUser;
  }

  findByUsername(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  findAll(): User[] {
    return this.users;
  }

  update(id: number, data: Partial<User>): User | undefined{
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, data);
    }
    return user;
  }

  delete(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
  }
}
