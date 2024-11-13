import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class genDto{
    @IsString()
    @IsNotEmpty()
    genNumber:string

    @IsNumber()
    @IsNotEmpty()
    genCapacity:number
}