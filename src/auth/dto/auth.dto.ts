import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    password:string

    @IsOptional()
    @IsString()
    role?:string

    @IsOptional()
    @IsString()
    firstName?:string

    @IsOptional()
    @IsString()
    lastName?:string
}