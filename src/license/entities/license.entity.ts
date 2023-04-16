import { UserEntity } from './user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'license' })
export class LicenseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  license: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, { eager: true })
  user: UserEntity;
}
