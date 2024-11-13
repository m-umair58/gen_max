import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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

    @Get()
    getGeneratorById(@Body() dto:genDto){
        return
    }
}
