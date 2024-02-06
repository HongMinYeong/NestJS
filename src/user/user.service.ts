// user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  // 사용자에게 제공하기를 원하는 서비스를 만든다.
  async getMainPage() {
    return 'Main Page';
  }
}
