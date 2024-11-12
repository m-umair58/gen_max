import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtStartegy } from "./strategy";

@Module({
    imports:[PrismaModule,JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,JwtStartegy]
})
export class AuthModule{

}