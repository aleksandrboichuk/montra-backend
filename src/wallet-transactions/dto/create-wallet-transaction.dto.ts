import {PickType} from "@nestjs/swagger";
import {WalletTransactionDto} from "./wallet-transaction.dto";

export class CreateWalletTransactionDto extends PickType(WalletTransactionDto, [
    'amount',
    'description',
    'wallet_id',
    'category_id',
    'type',
    'transfer_to',
    'receipt'
] as const){}