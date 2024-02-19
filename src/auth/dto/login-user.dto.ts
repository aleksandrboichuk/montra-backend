import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length, Matches, MaxLength, MinLength} from "class-validator";
import {validationRules} from "../constants/validation-rules";
import {errorMessages} from "../constants/error-messages";

export class LoginUserDto {

    @ApiProperty({description: "User Email", example: "test@montra.com"})
    @IsEmail({},{message: errorMessages.email.format})
    readonly email: string;

    @ApiProperty({description: "User Password", example: "123456"})
    @IsString({message: "Password must be a string"})
    @MinLength(validationRules.password.minLength, {message: errorMessages.password.minLength})
    @MaxLength(validationRules.password.maxLength, {message: errorMessages.password.maxLength})
    readonly password: string;
}