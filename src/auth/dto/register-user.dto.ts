import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length, Matches, MaxLength, MinLength} from "class-validator";
import {validationRulesConstant} from "../constants/validation-rules.constant";
import {isStringKey, matchFormatKey, maxLengthKey, minLengthKey} from "../../common/utils/error-key-generator.util";

export class RegisterUserDto {

    @ApiProperty({description: "User Name", example: "John"})
    @IsString({message: isStringKey('name')})
    @MinLength(
        validationRulesConstant.name.minLength, {
            message: minLengthKey('name')
        })
    @MaxLength(validationRulesConstant.name.maxLength, {
        message: maxLengthKey('name')
    })
    readonly name: string

    @ApiProperty({description: "User Email", example: "test@montra.com"})
    @IsEmail({},{message: matchFormatKey('email')})
    readonly email: string

    @ApiProperty({description: "User Password", example: "123456"})
    @IsString({message: isStringKey('password')})
    @MinLength(
        validationRulesConstant.password.minLength, {
            message: minLengthKey('password')
        })
    @MaxLength(validationRulesConstant.password.maxLength, {
        message: maxLengthKey('password')
    })
    readonly password: string
}