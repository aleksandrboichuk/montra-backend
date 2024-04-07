import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, MaxLength, MinLength} from "class-validator";
import {CurrencyDto} from "../../currencies/dto/currency.dto";
import {validationRulesConstant} from "../constants/validation-rules.constant";
import {isNumberKey, isStringKey, maxLengthKey, minLengthKey} from "../../common/utils/error-key-generator.util";

export class WalletDto {

    @ApiProperty({
        example: "uuid-uuid-uuid-uuid"
    })
    readonly id: string

    @ApiProperty({
        example: "uuid-uuid-uuid-uuid"
    })
    readonly user_id: string

    @ApiProperty({
        example: "My wallet"
    })
    @MinLength(validationRulesConstant.name.minLength, {
        message: minLengthKey('name')
    })
    @MaxLength(validationRulesConstant.name.maxLength, {
        message: maxLengthKey('name')
    })
    @IsString({message: isStringKey('name')})
    readonly name: string

    @ApiProperty({
        example: 255.12,
        required: true
    })
    @IsNumber({}, {
        message: isNumberKey('balance')
    })
    readonly balance: number

    @ApiProperty({
        default: true
    })
    readonly active: boolean

    @ApiProperty({
        example: "1a2b3c-1a2b3c-1a2b3c-1a2b3c-1a2b3c",
        required: true
    })
    @IsString({message: isStringKey('currency_id')})
    readonly currency_id: string

    @ApiProperty()
    readonly currency: CurrencyDto

    @ApiProperty()
    readonly transactions: object // TODO:: WalletTransactionDto
}