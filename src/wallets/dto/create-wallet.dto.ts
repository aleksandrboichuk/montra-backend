import {ApiProperty, PickType} from "@nestjs/swagger";
import {IsNumber, IsString, MaxLength, MinLength} from "class-validator";
import {WalletDto} from "./wallet.dto";

export class CreateWalletDto extends PickType(WalletDto, [
    'name',
    'balance',
    'currency_id'
] as const){}