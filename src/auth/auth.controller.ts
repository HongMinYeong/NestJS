import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //로그인시 LocalAuthGuard를 거치게 되면, passport(로그인을 위해 다운받은 패키지)에 의해
  //Request에 user 객체가 자동으로 생성
  //그 안에 user에 대한 정보(LocalAuthGuard)를 거치면 -> AuthService의 validateUser함수 실행
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() req) {
    const user = req?.user;

    console.log('user : ', user);

    return this.authService.logIn(user);
  }
}
