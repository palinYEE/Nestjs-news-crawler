import { ApiProperty } from '@nestjs/swagger';

export class licenseStatusDto {
  @ApiProperty({ description: '로그인 아이디' })
  username: string;

  @ApiProperty({ description: '해당 유저가 발급받은 라이선스 리스트' })
  license: Array<string>;

  @ApiProperty({ description: '해당 유저가 사용할 수 있는 라이선스 개수' })
  count: number;
}
