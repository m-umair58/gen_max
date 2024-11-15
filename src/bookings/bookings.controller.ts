import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { bookingDto } from './dto';
import { BookingsService } from './bookings.service';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))  // 'file' is the key in the form-data request
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      await this.bookingService.processExcelFile(file);  // Process the uploaded file
      return { message: 'Bookings data inserted successfully!' };
    } catch (error) {
      console.error(error);
      return { message: 'An error occurred while processing the file.' };
    }
  }
}
