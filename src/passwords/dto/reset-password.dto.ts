import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ResetPasswordDto {

    @IsString()
    readonly code: string;

    @IsString()
    readonly userId: string;

    @ApiProperty({description: "User Password", example: "123456"})
    @IsString()
    @Length(1, 100, {message: "Password must contains from 1 to 100 characters"})
    readonly password: string;

}