import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";
import {isStringKey} from "../../common/utils/error-key-generator.util";

export class VerifyUserDto {

    @ApiProperty({description: "Verification Code", example: "12345"})
    @IsString({message: isStringKey('code')})
    readonly code: string;
}