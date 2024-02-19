import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length, Matches, MaxLength, MinLength} from "class-validator";
import {validationRules} from "../constants/validation-rules";
import {errors} from "../constants/errors";

export class RegisterUserDto {

    @ApiProperty({description: "User Name", example: "John"})
    @IsString({message: "User Name must be a string"})
    @MinLength(validationRules.name.minLength, {message: errors.name.minLength})
    @MaxLength(validationRules.name.maxLength, {message: errors.name.maxLength})
    readonly name: string

    @ApiProperty({description: "User Email", example: "test@montra.com"})
    @IsEmail({},{message: errors.email.format})
    @Matches(validationRules.email.regexp)
    readonly email: string

    @ApiProperty({description: "User Password", example: "123456"})
    @IsString({message: "Password must be a string"})
    @MinLength(validationRules.password.minLength, {message: errors.password.minLength})
    @MaxLength(validationRules.password.maxLength, {message: errors.password.maxLength})
    readonly password: string
}