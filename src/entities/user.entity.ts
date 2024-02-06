import { Column, Entity, OneToMany } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common/common.entity';

// 테이블 이름을 User로 설정해주는 데코레이터입니다.
//이걸 적용 안할시, 클래스 이름인 UserEntity가 테이블 명이 됨
@Entity('User')
export class UserEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { unique: false, nullable: false })
  password: string;

  // 일대다(1:N)관계를 의미
  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles: ArticleEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
