import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
//JwtStrategy 클래스는 PassportStrategy 상속받는다
//JwtStrategy(passport-jwt에서 import 한 Strategy)사용 -> 이 전략의 이름을 'jwt'로 짓는다 (guard)에서 사용
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      // 프론트가 보낸 요청의 HTTP Header에 담겨있는 JWT를 추출하기 위해 필요
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 유효기간 무시할거냐
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload) {
    const { iat, exp, ...user } = payload;
    return user;
  }
}
