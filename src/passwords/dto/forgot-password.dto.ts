import {IsEmail} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {matchFormatKey} from "../../common/utils/error-key-generator.util";

export class ForgotPasswordDto {

    @ApiProperty({description: "User Email", example: "test@montra.com"})
    @IsEmail({},{message: matchFormatKey('email')})
    readonly email: string;

}