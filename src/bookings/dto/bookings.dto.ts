import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class bookingDto {
    @Type(() => Date)  // Automatically converts ISO string to Date
    @IsDate()
    @IsNotEmpty()
    bookingDate: Date;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    returnDate: Date;

    @IsNumber()
    @IsNotEmpty()
    genId: number;
}
