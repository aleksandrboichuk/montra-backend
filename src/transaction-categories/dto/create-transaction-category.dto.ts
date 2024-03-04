import {ApiProperty, PickType} from "@nestjs/swagger";
import {TransactionCategoryDto} from "./transaction-category.dto";

export class CreateTransactionCategoryDto extends PickType(TransactionCategoryDto, [
    'name',
    'icon',
    'main'
] as const){}