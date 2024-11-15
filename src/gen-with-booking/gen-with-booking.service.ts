import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenWithBookingService {
  constructor(private prisma: PrismaService) {}
  async genWithBookingsGroupedByCapacity() {
    try {
      // Fetch all generators
      const generators = await this.prisma.generators.findMany();
  
      // Prepare a mapping of capacity to generators and their bookings
      const groupedByCapacity = {};
  
      for (const generator of generators) {
        const { genCapacity, genSrNumber } = generator;
  
        // Initialize capacity group if not present
        if (!groupedByCapacity[genCapacity]) {
          groupedByCapacity[genCapacity] = [];
        }
  
        // Fetch bookings for the current generator
        const bookings = await this.prisma.bookings.findMany({
          where: { genSr: genSrNumber },
        });
  
        // Add generator and its bookings to the group
        groupedByCapacity[genCapacity].push({
          genSr: genSrNumber,
          bookings,
        });
      }
  
      // Transform the grouped data into the desired format
      const response = Object.entries(groupedByCapacity).map(([capacity, generators]) => ({
        capacity,
        generators,
      }));
  
      return response;
    } catch (e) {
      return {
        msg: e.message,
      };
    }
  }
  
}
