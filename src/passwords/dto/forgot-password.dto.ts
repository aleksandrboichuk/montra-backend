import {IsEmail} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ForgotPasswordDto {

    @ApiProperty({description: "User Email", example: "test@montra.com"})
    @IsEmail()
    readonly email: string;

}