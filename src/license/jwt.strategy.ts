import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from './entities/user.entity';
import { Request } from 'express';
// import { UserRepository } from './user.repository';

const customExtractor = (req: Request) => {
  const { body } = req;
  return body && body.token ? body.token : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // private userRepository: UserRepository, // @InjectRepository(UserRepository)
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: customExtractor, // 토큰을 어디서 가져올지 (이는 auth header 에서 가져옴)
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: UserEntity = await UserEntity.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
