import { UserEntity } from './user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
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

  @ManyToOne(() => UserEntity, (user) => user.license, { eager: false })
  user: UserEntity;
}
