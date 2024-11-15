import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GeneratorService } from './generator.service';
import { genDto } from './dto';

@Controller('generators')
export class GeneratorController {
    constructor(private generatorService:GeneratorService){}
    
    @Post('create')
    add_generator(@Body() dto:genDto){
        return this.generatorService.add_generator(dto);
    }

    @Get('byId')
    getGeneratorById(@Query('genSrNumber') genSrNumber: string) {
        console.log(genSrNumber)
        return this.generatorService.getGeneratorById(genSrNumber);
    }

}
