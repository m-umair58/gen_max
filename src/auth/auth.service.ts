import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private prisma: PrismaService,
      private jwt: JwtService,
      private config: ConfigService,
    ) {}
    async signup(dto: AuthDto) {
        // generate password hash
        const hash = await argon.hash(dto.password);
        try {
          // add user to the database
          if(!dto.role){
            throw new BadRequestException('Role field is Required');
          }
          const user = await this.prisma.user.create({
            data: {
              email: dto.email,
              hash,
              firstName:dto.firstName,
              lastName:dto.lastName,
              Role: dto.role
            },
          });
          //return the saved user
        return this.signToken(user.id, user.email);
        } catch (e: unknown) {
          if (e instanceof BadRequestException) {
            throw new BadRequestException('Role field is Required');
          }
          if (e instanceof PrismaClientKnownRequestError) {
            console.log('Forbidden exception caught:', e.message);
            throw new ForbiddenException('Email already taken');
          }
        
          // Handle case when 'e' is of unknown type
          if (e instanceof Error) {
            return {
              msg: "error occurred",
              details: e.message, // Safe to access e.message now
            };
          }
        
          // If e is not an instance of Error or known exceptions
          return {
            msg: "error occurred",
            details: 'Unknown error occurred', // Fallback for unknown types
          };
        }
      }

      async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });
        if (!user) {
          throw new ForbiddenException('Credentials incorrect');
        }
    
        const pwMatcehs = await argon.verify(user.hash, dto.password);
        if (!pwMatcehs) {
          throw new ForbiddenException('Credentials incorrect');
        }
    
        return this.signToken(user.id, user.email);
    
      }
      async signToken(userId: Number, email: String) {
        const payload = {
          sub: userId,
          email,
        };
        const token =  await this.jwt.signAsync(payload, {
          expiresIn: '15m',
          secret: this.config.get('JWT_SECRET'),
        });
        return {
            access_token:token
        }
      }
}
