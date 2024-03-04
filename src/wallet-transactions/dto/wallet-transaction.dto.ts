import {WalletDto} from "../../wallets/dto/wallet.dto";
import {ApiProperty} from "@nestjs/swagger";
import {$Enums} from ".prisma/client";
import {IsNumber, IsString, MaxLength, MinLength} from "class-validator";

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
    @IsNumber()
    readonly amount: number;

    @ApiProperty({
        example: "Bought products",
        required: true
    })
    @IsString()
    @MinLength(2)
    @MaxLength(2048)
    readonly description: string;

    @ApiProperty({
        example: "Bought products",
        required: true,
        enum: $Enums.TransactionTypes
    })
    @IsString()
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