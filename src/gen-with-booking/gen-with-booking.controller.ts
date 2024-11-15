import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GenWithBookingService } from './gen-with-booking.service';

@Controller('gen-with-booking')
export class GenWithBookingController {
    constructor(private genwithbookingService:GenWithBookingService){}

    @Get('')
    genWithBookings(){
        return this.genwithbookingService.genWithBookingsGroupedByCapacity();
    }
}
