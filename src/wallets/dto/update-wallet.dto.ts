import {PickType} from "@nestjs/swagger";
import {WalletDto} from "./wallet.dto";

export class UpdateWalletDto  extends PickType(WalletDto, [
    'name',
    'balance',
    'currency_id'
] as const){}
