import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { bookingDto } from './dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingService: BookingsService) {}

  @Post('create')
  create_booking(@Body() dto: bookingDto) {
    return this.bookingService.create_booking(dto);
  }

  @Get('byGenId/:id')
  getBookingsByGenId(@Param('id') id: string) {
    return this.bookingService.getBookingsByGenId(id);
  }

  @Get('availability')
  async getGeneratorsAvailability(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('capacity') capacity: string,
  ) {
    // Convert the startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    console.log(start)

    return this.bookingService.checkGeneratorsAvailability(start, end,capacity);
  }
}
