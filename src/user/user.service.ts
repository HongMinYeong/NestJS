// user.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  // 사용자에게 제공하기를 원하는 서비스를 만든다.
  constructor(
    // Repository를 Service에 주입
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async getMainPage() {
    return 'Main Page';
  }

  async register(email: string, password: string) {
    const existedUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (existedUser) {
      throw new BadRequestException('이미 해당 이메일이 존재합니다.');
    }
    //10은 salt값
    console.log(Number(this.configService.get('SALT')));
    const hashedPassword = await hash(password, 10);
    //userRepository는 DB에 쿼리문을 날려주는 아이
    //await 써서 결과값 받아올때까지 기다려야함
    const user = await this.userRepository.save({
      email: email,
      password: hashedPassword,
    });
    //save 함수는 create(혹은 update)와 select를 동시에 한다.
    //그래서 user를 그대로 리턴
    return user;
  }
}
