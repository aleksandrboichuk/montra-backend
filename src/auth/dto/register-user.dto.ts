import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class RegisterUserDto {

    @ApiProperty({description: "User Name", example: "John"})
    @IsString({message: "User Name must be a string"})
    @Length(3, 50, {message: "Name must contains from 3 to 50 characters"})
    readonly name: string

    @ApiProperty({description: "User Email", example: "test@montra.com"})
    @IsEmail({},{message: "Incorrect email format"})
    readonly email: string

    @ApiProperty({description: "User Password", example: "123456"})
    @IsString({message: "Password must be a string"})
    @Length(6, 100, {message: "Password must contains from 6 to 100 characters"})
    readonly password: string
}