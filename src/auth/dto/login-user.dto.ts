import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";
import {validationRulesConstant} from "../constants/validation-rules.constant";
import {matchFormatKey, isStringKey, maxLengthKey, minLengthKey} from "../../common/utils/error-key-generator.util";

export class LoginUserDto {

    @ApiProperty({description: "User Email", example: "test@montra.com"})
    @IsEmail({},{message: matchFormatKey('email')})
    readonly email: string;

    @ApiProperty({description: "User Password", example: "123456"})
    @IsString({message: isStringKey('password')})
    @MinLength(
        validationRulesConstant.password.minLength, {
            message: minLengthKey('password')
        })
    @MaxLength(validationRulesConstant.password.maxLength, {
        message: maxLengthKey('password')
    })
    readonly password: string;
}