import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { genDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class GeneratorService {
    constructor(private prisma:PrismaService){}

    async add_generator(dto:genDto){
        try{
            const generator = await this.prisma.generators.create({
                data:{
                    genSrNumber:dto.genSrNumber,
                    genCapacity:dto.genCapacity
                }
            })
            return generator
        }catch(e){
            if (e instanceof PrismaClientKnownRequestError) {
                console.log('Forbidden exception caught:', e.message); 
                throw new ForbiddenException('there is an error');
              }
        }
    }
    async getGeneratorById(id:number){
        try{
            const generator = await this.prisma.generators.findFirst({
                where:{
                    id:Number(id)
                }
            })
            return generator;
        }
        catch(e){
            return {
                msg:e.message
            }
        }
    }
}
