import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
} from 'typeorm';
import { LicenseEntity } from './license.entity';

@Entity()
@Unique(['username']) // 유니크한 값인지 확인하는 데코레이터
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @OneToMany(() => LicenseEntity, (licenseEntity) => licenseEntity.license, {
    eager: true,
  })
  license: LicenseEntity[];
}
