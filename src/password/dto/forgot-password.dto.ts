import {IsEmail} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ForgotPasswordDto {

    @ApiProperty({description: "User Email", example: "test@montra.com"})
    @IsEmail({},{message: "Incorrect email format"})
    readonly email: string;

}