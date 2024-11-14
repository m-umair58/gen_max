import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { bookingDto } from './dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
    constructor(private bookingService:BookingsService){}

    @Post('create')
    create_booking(@Body() dto:bookingDto){
        return this.bookingService.create_booking(dto);
    }
}
