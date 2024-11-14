import { Module } from '@nestjs/common';
import { GenWithBookingService } from './gen-with-booking.service';
import { GenWithBookingController } from './gen-with-booking.controller';

@Module({
  providers: [GenWithBookingService],
  controllers: [GenWithBookingController]
})
export class GenWithBookingModule {}
