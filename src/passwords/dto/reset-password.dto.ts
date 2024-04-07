import {IsString, Length, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {validationRulesConstant} from "../constants/validation-rules.constant";
import {isStringKey, maxLengthKey, minLengthKey} from "../../common/utils/error-key-generator.util";

export class ResetPasswordDto {

    @ApiProperty({description: "Reset Password Code", example: "12345"})
    @IsString({message: isStringKey('code')})
    readonly code: string;

    @ApiProperty({description: "User Id", example: "uuid-uuid-uuid-uuid"})
    @IsString({message: isStringKey('userId')})
    readonly userId: string;

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