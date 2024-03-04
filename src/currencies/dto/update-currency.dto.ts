import {PickType} from '@nestjs/swagger';
import {CurrencyDto} from "./currency.dto";

export class UpdateCurrencyDto extends PickType(CurrencyDto, [
    'name',
    'symbol',
    'code'
] as const) {}
