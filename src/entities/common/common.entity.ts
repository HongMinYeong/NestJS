import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CommonBigPKEntity {
  // Auto Increment가 걸린 PK(기본키)를 만드는 칼럼
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  //생성일자를 적용해주는 칼럼
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  //   update 쿼리를 날릴 때, 자동으로 수정일자
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  //   Soft Delete를 위한 칼럼
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
