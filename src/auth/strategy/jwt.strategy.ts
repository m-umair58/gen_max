import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';  // Import ConfigModule
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
    // Debugging: Check if config service is being injected correctly
    console.log('JWT_SECRET:', config.get('JWT_SECRET'));  // Log JWT_SECRET
  }

  async validate(payload: { sub: number; email: string }) {
    console.log({ payload });
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (user) {
      delete user.hash;  // Make sure the hash field is deleted
      return user;
    }
    throw new Error('User not found');
  }
}
