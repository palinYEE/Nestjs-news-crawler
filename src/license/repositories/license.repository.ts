import { UserEntity } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { LicenseEntity } from 'src/license/entities/license.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LicenseRepository extends Repository<LicenseEntity> {
  constructor(private dataSource: DataSource) {
    super(LicenseEntity, dataSource.createEntityManager());
  }

  async saveJwtToken(jwtToken: string, userEntity: UserEntity) {
    const licenseData = new LicenseEntity();
    licenseData.user = userEntity;
    licenseData.license = jwtToken;
    await this.save(licenseData);
  }

  async getAllLicenseData(): Promise<LicenseEntity[]> {
    return this.find();
  }

  async getLicenseStatusById(userEntity: UserEntity) {
    return this.findAndCount({
      where: {
        user: {
          id: userEntity.id,
        },
      },
    });
  }
}
