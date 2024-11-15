import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class bookingDto {
    @Type(() => Date)  // Automatically converts ISO string to Date
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    endDate: Date;
    
    @IsString()
    @IsNotEmpty()
    genSr: string;

    @IsString()
    @IsNotEmpty()
    eventName: string;
    
    @IsString()
    @IsNotEmpty()
    instalationType: string;
    
    @IsString()
    @IsNotEmpty()
    jobNumber: string;
    
    @IsString()
    @IsNotEmpty()
    location: string;
    
    @IsString()
    @IsNotEmpty()
    mainClient: string;
    
    @IsNumber()
    @IsNotEmpty()
    numberOfDaysToHire: number;
    
    @IsString()
    @IsNotEmpty()
    projectNumber: string;
    
    @IsString()
    @IsNotEmpty()
    siteInfo: string;
    
    @IsString()
    @IsNotEmpty()
    subClient: string;
}
