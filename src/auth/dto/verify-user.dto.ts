import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class VerifyUserDto {

    @ApiProperty({description: "Verification Code", example: 12345})
    @IsString()
    readonly code: string;
}