import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenWithBookingService {
  constructor(private prisma: PrismaService) {}
  async genWithBookings() {
    try {
      const generators = await this.prisma.generator.findMany();
      const bookings = await Promise.all(
        generators.map( async (data)=>{
            const genId = data.genNumber;
            const booking = await this.prisma.booking.findMany({
                where:{
                    genId:data.id
                }
            })
            if(!booking){
                throw new BadRequestException("couldnt get the bookings")
            }
            return{
                gen_data:{
                    genNumber:genId,
                    capacity:data.capacity
                },
                booking
            }
        })
        
      )
      return bookings;
    } catch (e) {
      return {
        msg: e.message,
      };
    }
  }
}
