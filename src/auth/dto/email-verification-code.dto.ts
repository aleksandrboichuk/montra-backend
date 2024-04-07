import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";
import {isStringKey} from "../../common/utils/error-key-generator.util";

export class EmailVerificationCodeDto {

    @ApiProperty({description: "User Id", example: "uuid-uuid-uuid-uuid"})
    @IsString({message: isStringKey('userId')})
    readonly userId: string;
}