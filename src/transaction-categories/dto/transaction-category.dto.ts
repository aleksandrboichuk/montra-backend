import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {validationRulesConstant} from "../constants/validation-rules.constant";
import {isBooleanKey, isStringKey, maxLengthKey, minLengthKey} from "../../common/utils/error-key-generator.util";

export class TransactionCategoryDto {

    @ApiProperty()
    @IsString({message: isStringKey('name')})
    @MinLength(validationRulesConstant.name.minLength, {
        message: minLengthKey('name'),
    })
    @MaxLength(validationRulesConstant.name.maxLength, {
            message: maxLengthKey('name'),
    })
    readonly name: string;

    @ApiProperty({description: "Property defines is it main category for all users"})
    @IsBoolean({message: isBooleanKey('main')})
    @IsOptional()
    readonly main: boolean;

    @ApiProperty()
    @IsString()
    @MinLength(validationRulesConstant.icon.minLength, {
        message: minLengthKey('icon'),
    })
    @MaxLength(validationRulesConstant.icon.maxLength, {
        message: maxLengthKey('icon'),
    })
    readonly icon: string;
}