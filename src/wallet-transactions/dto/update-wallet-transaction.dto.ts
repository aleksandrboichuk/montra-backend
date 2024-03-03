import {PickType} from "@nestjs/swagger";
import {WalletTransactionDto} from "./wallet-transaction.dto";

export class UpdateWalletTransactionDto extends PickType(WalletTransactionDto, [
    'amount',
    'description',
    'category_id',
    'type',
    'transfer_to',
    'receipt'
] as const){}