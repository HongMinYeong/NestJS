// user.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/main')
  async getMainPage() {
    return this.userService.getMainPage();
  }

  @Post('/register')
  async register(@Body() body) {
    const email = body?.email;
    const password = body?.password;

    //여기서 this -> UserController
    return this.userService.register(email, password);
  }
  // @UseGuards(JwtAuthGuard)
  // @Get('user-info')
  // async getUserInfo() {
  //   return 'user-info Page';
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@User() user) {
    return user;
  }
}
