import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class genDto{
    @IsString()
    @IsNotEmpty()
    genSrNumber:string

    @IsString()
    @IsNotEmpty()
    genCapacity:string
}