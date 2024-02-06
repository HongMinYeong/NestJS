import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  //생성자에 authService 주입하여 서비스 이용할 수 있도록함
  constructor(private readonly authService: AuthService) {
    //super -> 상속받은 클래스의 생성자를 호출하는 함수
    //유저 아이디는 email이라는 변수를 사용할 것이고, 비밀번호는 password라는 변수를 사용하겠다 선언
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
