import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { bookingDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as XLSX from 'xlsx';

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
      console.log('Requested capacity:', capacity);

  
      // Fetch generators matching the requested capacity
      const generators = await this.prisma.generators.findMany({
        where: { genCapacity: capacity },
      });
  
  
      const availableGenerators = [];
  
      // Check availability of each generator
      for (const generator of generators) {
        const existingBookings = await this.prisma.bookings.findMany({
          where: {
            genSr: generator.genSrNumber,
          },
        });
  
        // Determine if the generator is available
        const isAvailable = !existingBookings.some((booking) => {
          const bookingStart = new Date(booking.startDate);
          const bookingEnd = new Date(booking.endDate);
  
  
          // Check for overlap between requested dates and booking dates
          const overlap = startDate <= bookingEnd && endDate >= bookingStart;
          if (overlap) {
            console.log(
              `Overlap found for generator ${generator.id} with booking from ${bookingStart} to ${bookingEnd}`,
            );
          }
          return overlap;
        });
  
        if (isAvailable) {
          // Push the specific available generator to the array
          availableGenerators.push(generator);
        }
      }
  
  
      return availableGenerators;
    } catch (e) {
      console.error('Error checking availability:', e.message);
      throw new InternalServerErrorException('Failed to check availability');
    }
  }
  

  async processExcelFile(file: Express.Multer.File): Promise<void> {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Use the first sheet in the Excel file
    const sheet = workbook.Sheets[sheetName];
    const data: any[] = XLSX.utils.sheet_to_json(sheet); // Convert Excel sheet to JSON

    // Iterate over the rows and insert each one into the database
    const insertPromises = data.map(async (row) => {
      return this.prisma.bookings.create({
        data: {
          eventName: row.eventName || '',  // Default value handling
          genSr: row.genSr || '',
          instalationType: row.instalationType || '',
          jobNumber: row.jobNumber || '',
          location: row.location || '',
          mainClient: row.mainClient || '',
          numberOfDaysToHire: row.numberOfDaysToHire || 0,
          projectNumber: row.projectNumber || '',
          siteInfo: row.siteInfo || '',
          subClient: row.subClient || '',
          startDate: new Date(row.startDate),  // Assuming startDate and endDate are in a valid date format
          endDate: new Date(row.endDate),      // Adjust date format if needed
        },
      });
    });

    // Wait for all data to be inserted
    await Promise.all(insertPromises);
  }

  async getGeneratorAvailableDates(genSrId: string) {
    try {
      // Fetch all bookings for the given generator
      const bookings = await this.prisma.bookings.findMany({
        where: { genSr: genSrId },
        orderBy: { startDate: 'asc' }, // Ensure bookings are sorted by start date
      });
  
      const availableDates = [];
      const today = new Date(); // Use current date as the starting point for availability
      let currentDate = new Date(today);
  
      // Loop through each booking to calculate available dates
      for (const booking of bookings) {
        const bookingStart = new Date(booking.startDate);
        const bookingEnd = new Date(booking.endDate);
  
        // If currentDate is before the bookingStart, calculate the available range
        if (currentDate < bookingStart) {
          availableDates.push({
            start: new Date(currentDate),
            end: new Date(bookingStart),
          });
        }
  
        // Move currentDate pointer to after the bookingEnd
        currentDate = new Date(Math.max(currentDate.getTime(), bookingEnd.getTime()));
      }
  
      // After processing all bookings, add availability beyond the last booking
      availableDates.push({
        start: new Date(currentDate),
        end: null, // Indicates no end date for availability
      });
  
      return {
        genSrId,
        availableDates,
      };
    } catch (error) {
      console.error('Error retrieving generator availability:', error.message);
      throw new InternalServerErrorException('Failed to retrieve generator availability');
    }
  }
  
}
