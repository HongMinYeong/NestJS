import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common/common.entity';
import { UserEntity } from './user.entity';

@Entity('Article')
export class ArticleEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false })
  title: string;

  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  // 다대일 (N:1) 관계
  // 여기서 타입은 배열이 아니다.

  @ManyToOne(() => UserEntity, (user) => user.articles)
  //userId는 외래키 -> @JoinColumn 이렇게만 써줘도 된다.
  //JoinColumn은 관계를 맺은 테이블 중에 한쪽만 써주면 된다. 여기선 외래키가 있는 곳에 작성
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];
}
