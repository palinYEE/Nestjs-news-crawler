import { Injectable } from '@nestjs/common';
import { LicenseEntity } from 'src/license/entities/license.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LicenseRepository extends Repository<LicenseEntity> {
  constructor(private dataSource: DataSource) {
    super(LicenseEntity, dataSource.createEntityManager());
  }
}
