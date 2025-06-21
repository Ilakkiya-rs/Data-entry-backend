// import { Controller, Post, Get, Delete, Param, Body, NotFoundException } from '@nestjs/common';
// import { UserService } from './user.service';
// import { User } from './user.entity';

// @Controller('users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post()
//   create(@Body() user: Omit<User, 'id'>): User {
//     return this.userService.create(user);
//   }

//   @Get()
//   findAll(): User[] {
//     return this.userService.findAll();
//   }

//   @Get(':username')
//   findOne(@Param('username') username: string): User {
//     const user = this.userService.findByUsername(username);
//     if (!user) throw new NotFoundException(`User ${username} not found`);
//     return user;
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): { deleted: boolean } {
//     return this.userService.remove(+id);
//   }
// }
// src/user/user.controller.ts
// user.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

   @Post()
  create(@Body() body: CreateUserDto): User {
    const { username, password, role } = body;
    return this.userService.create(username, password, role);
  }

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }



  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    return this.userService.delete(id);
  }
}
