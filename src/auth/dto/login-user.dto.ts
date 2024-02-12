import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class LoginUserDto {

    @ApiProperty({description: "User Email", example: "test@montra.com"})
    @IsEmail({},{message: "Incorrect email format"})
    readonly email: string;

    @ApiProperty({description: "User Password", example: "123456"})
    @IsString({message: "Password must be a string"})
    @Length(1, 100, {message: "Password must contains from 1 to 100 characters"})
    readonly password: string;
}