import {ApiProperty} from "@nestjs/swagger";
import {MaxLength, MinLength} from "class-validator";
import {validationRulesConstant} from "../constants/validation-rules.constant";
import {maxLengthKey, minLengthKey} from "../../common/utils/error-key-generator.util";

export class CurrencyDto {

    @ApiProperty({
        description: "Currency ID",
        example: "uuid-uuid-uuid-uuid"
    })
    readonly id: string

    @ApiProperty({
        description: "Currency name",
        example: "USA Dollar"
    })
    @MinLength(
        validationRulesConstant.name.minLength, {
            message: minLengthKey('name')
        })
    @MaxLength(validationRulesConstant.name.maxLength, {
        message: maxLengthKey('name')
    })
    readonly name: string

    @ApiProperty({
        description: "Currency symbol",
        example: "$"
    })
    @MinLength(
        validationRulesConstant.symbol.minLength, {
            message: minLengthKey('symbol')
        })
    @MaxLength(validationRulesConstant.symbol.maxLength, {
        message: maxLengthKey('symbol')
    })
    readonly symbol: string

    @ApiProperty({
        description: "Currency code",
        example: "USD"
    })
    @MinLength(
        validationRulesConstant.code.minLength, {
            message: minLengthKey('code')
        })
    @MaxLength(validationRulesConstant.code.maxLength, {
        message: maxLengthKey('code')
    })
    readonly code: string
}