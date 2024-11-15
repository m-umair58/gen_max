import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { bookingDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}
  async create_booking(dto: bookingDto) {
    try {
      const generator = await this.prisma.generators.findFirst({
        where: {
          genSrNumber: dto.genSr,
        },
      });
      if (!generator) {
        throw new BadRequestException("Generator with this id doesn't exists");
      }

      const existingBookings = await this.prisma.bookings.findMany({
        where: {
          genSr: dto.genSr,
        },
      });

      // Check for overlapping bookings
      const isOverlap = existingBookings.some((booking) => {
        const bookingStart = new Date(dto.startDate); // New booking's start date
        const bookingEnd = new Date(dto.endDate); // New booking's end date

        const existingBookingStart = new Date(booking.startDate); // Existing booking's start date
        const existingBookingEnd = new Date(booking.endDate); // Existing booking's end date

        // Check if the new booking overlaps with any of the existing bookings
        return (
          bookingStart < existingBookingEnd && bookingEnd > existingBookingStart // There is an overlap
        );
      });

      // If there is an overlap, throw an error
      if (isOverlap) {
        throw new BadRequestException(
          'The selected time range is unavailable due to overlapping bookings.',
        );
      }

      // If no overlap, create the new booking
      const newBooking = await this.prisma.bookings.create({
        data: {
          genSr: dto.genSr,
          startDate: dto.startDate,
          endDate: dto.endDate,
          eventName:dto.eventName,   
          instalationType:dto.instalationType,
          jobNumber:dto.jobNumber,
          location:dto.location,           
          mainClient:dto.mainClient,   
          numberOfDaysToHire:dto.numberOfDaysToHire,
          projectNumber:dto.projectNumber,        
          siteInfo:dto.siteInfo,
          subClient:dto.subClient,
        },
      });

      return newBooking;
    } catch (e) {
      return {
        msg: e.message,
      };
    }
  }
  async getBookingsByGenId(id: string) {
    try {
      const bookings = await this.prisma.bookings.findMany({
        where: {
          genSr: id,
        },
      });
      return bookings;
    } catch (e) {
      return {
        msg: e.message,
      };
    }
  }
  async checkGeneratorsAvailability(
    startDate: Date,
    endDate: Date,
    capacity: string,
  ) {
    try {
      console.log('Checking availability from:', startDate, 'to:', endDate);

      const generators = await this.prisma.generators.findMany({
        where: { 
            genCapacity:capacity 
        },
      });
      console.log('Total generators:', generators.length);

      const availableGenerators = [];

      for (const generator of generators) {
        const existingBookings = await this.prisma.bookings.findMany({
          where: {
            genSr: generator.genSrNumber,
          },
        });

        console.log(
          `Checking generator ${generator.id} with ${existingBookings.length} bookings`,
        );

        const isAvailable = !existingBookings.some((booking) => {
          const bookingStart = new Date(booking.startDate);
          const bookingEnd = new Date(booking.endDate);

          // Log each booking range to see why generators are being marked as unavailable
          console.log(
            `Generator ${generator.id} booking:`,
            bookingStart,
            'to',
            bookingEnd,
          );

          // Check if the new booking range overlaps with existing booking range
          const overlap = startDate <= bookingEnd && endDate >= bookingStart;
          if (overlap) {
            console.log(
              `Overlap found for generator ${generator.id} with booking from ${bookingStart} to ${bookingEnd}`,
            );
          }
          return overlap;
        });

        if (isAvailable) {
          availableGenerators.push(generator);
        }
      }

      console.log('Available generators:', availableGenerators);

      return availableGenerators;
    } catch (e) {
      console.error('Error checking availability:', e.message);
      throw new InternalServerErrorException('Failed to check availability');
    }
  }
}
