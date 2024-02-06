import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// 해당 가드를 컨트롤러의 함수에 붙이면, 해당 함수를 실행시키기전에 Jwt로 로그인이 되어있나 확인하는 작업 거침
export class JwtAuthGuard extends AuthGuard('jwt') {}
