import {ApiProperty, PickType} from "@nestjs/swagger";
import {TransactionCategoryDto} from "./transaction-category.dto";

export class UpdateTransactionCategoryDto extends PickType(TransactionCategoryDto, [
    'name',
    'main',
    'icon'
] as const){}