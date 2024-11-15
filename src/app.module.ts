import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { GeneratorModule } from './generator/generator.module';
import { BookingsModule } from './bookings/bookings.module';
import { GenWithBookingModule } from './gen-with-booking/gen-with-booking.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',  // Ensure the path to your .env file is correct
    }),
    MulterModule.register({
      dest: './uploads',  // Optional directory to store the uploaded files
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    GeneratorModule,
    BookingsModule,
    GenWithBookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
