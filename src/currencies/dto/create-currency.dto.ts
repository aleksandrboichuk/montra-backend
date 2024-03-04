import {PickType} from "@nestjs/swagger";
import {CurrencyDto} from "./currency.dto";

export class CreateCurrencyDto extends PickType(CurrencyDto, [
    'name',
    'symbol',
    'code'
] as const) {}
