import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, MaxLength, MinLength} from "class-validator";
import {CurrencyDto} from "../../currencies/dto/currency.dto";
import {validationRulesConstant} from "../constants/validation-rules.constant";
import {WalletTransactionDto} from "../../wallet-transactions/dto/wallet-transaction.dto";
import {forwardRef} from "@nestjs/common";

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
    @MinLength(validationRulesConstant.name.minLength)
    @MaxLength(validationRulesConstant.name.maxLength)
    @IsString()
    readonly name: string

    @ApiProperty({
        example: 255.12,
        required: true
    })
    @IsNumber()
    readonly balance: number

    @ApiProperty({
        default: true
    })
    readonly active: boolean

    @ApiProperty({
        example: "1a2b3c-1a2b3c-1a2b3c-1a2b3c-1a2b3c",
        required: true
    })
    @IsString()
    readonly currency_id: string

    @ApiProperty()
    readonly currency: CurrencyDto

    @ApiProperty()
    readonly transactions: object // TODO:: WalletTransactionDto
}