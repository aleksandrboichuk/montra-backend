import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length, Matches, MaxLength, MinLength} from "class-validator";
import {validationRulesConstant} from "../constants/validation-rules.constant";
import {errorMessagesConstant} from "../constants/error-messages.constant";

export class RegisterUserDto {

    @ApiProperty({description: "User Name", example: "John"})
    @IsString({message: "User Name must be a string"})
    @MinLength(validationRulesConstant.name.minLength, {message: errorMessagesConstant.name.minLength})
    @MaxLength(validationRulesConstant.name.maxLength, {message: errorMessagesConstant.name.maxLength})
    readonly name: string

    @ApiProperty({description: "User Email", example: "test@montra.com"})
    @IsEmail({},{message: errorMessagesConstant.email.format})
    readonly email: string

    @ApiProperty({description: "User Password", example: "123456"})
    @IsString({message: "Password must be a string"})
    @MinLength(validationRulesConstant.password.minLength, {message: errorMessagesConstant.password.minLength})
    @MaxLength(validationRulesConstant.password.maxLength, {message: errorMessagesConstant.password.maxLength})
    readonly password: string
}