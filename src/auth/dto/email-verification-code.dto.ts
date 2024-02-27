import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsString, Length} from "class-validator";

export class EmailVerificationCodeDto {

    @ApiProperty({description: "User Id", example: "uuid123"})
    @IsString()
    readonly userId: string;
}