import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtStrategy } from "./strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports:[ConfigModule.forRoot(),PrismaModule,JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule{

}