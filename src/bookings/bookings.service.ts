import { BadRequestException, Injectable } from '@nestjs/common';
import { bookingDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
    constructor(private prisma:PrismaService){}
    async create_booking(dto:bookingDto){
        try{
            const generator = await this.prisma.generator.findFirst({
                where:{
                    id:dto.genId
                }
            })
            if(!generator){
                throw new BadRequestException("Generator with this id doesn't exists")
            }
            const booking = await this.prisma.booking.create({
                data:{
                    genId:dto.genId,
                    bookingDate:dto.bookingDate,
                    returnDate:dto.returnDate
                }
            })
            return booking;
        }catch(e){
            return{
                msg:e.message
            }
        }
    }
}
