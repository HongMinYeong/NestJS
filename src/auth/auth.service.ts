import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    //생성자에 UserRepository 주입해서 AuthService에서 UserRepository를 사용할 수 있도록함
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    //생성자에 jwtService 주입
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new BadRequestException('이메일이 잘못되었습니다.');
    }

    //verify password
    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async logIn(user) {
    //user 객체를 받아서 서명(암호화, sign)을하고 객체 형태로 내보낼거얌
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
