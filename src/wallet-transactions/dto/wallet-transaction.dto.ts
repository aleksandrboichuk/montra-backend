import {WalletDto} from "../../wallets/dto/wallet.dto";
import {ApiProperty} from "@nestjs/swagger";
import {$Enums} from ".prisma/client";
import {IsNumber, IsString, MaxLength, MinLength} from "class-validator";
import {isNumberKey, isStringKey, maxLengthKey, minLengthKey} from "../../common/utils/error-key-generator.util";
import {validationRulesConstant} from "../constants/validation-rules.constant";

export class WalletTransactionDto {

    @ApiProperty({
        example: "uuid-uuid-uuid-uuid"
    })
    readonly id: string;

    @ApiProperty({
        example: "uuid-uuid-uuid-uuid"
    })
    readonly wallet_id: string;

    @ApiProperty({
        example: 253.21,
        required: true
    })
    @IsNumber({}, {
        message: isNumberKey('amount')
    })
    readonly amount: number;

    @ApiProperty({
        example: "Bought products",
        required: true
    })
    @IsString({message: isStringKey('description')})
    @MinLength(validationRulesConstant.description.minLength, {
        message: minLengthKey('description')
    })
    @MinLength(validationRulesConstant.description.maxLength, {
        message: maxLengthKey('description')
    })
    readonly description: string;

    @ApiProperty({
        example: "Bought products",
        required: true,
        enum: $Enums.TransactionTypes
    })
    @IsString({message: isStringKey('type')})
    readonly type: $Enums.TransactionTypes;

    @ApiProperty({
        example: "uuid-uuid-uuid-uuid"
    })
    readonly category_id: string;

    @ApiProperty({
        example: "Michael"
    })
    readonly transfer_to: string;

    @ApiProperty({
        example: ".../uploaded/receipt.pdf"
    })
    readonly receipt: string;

    @ApiProperty()
    readonly wallet: WalletDto;
}