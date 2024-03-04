import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {validationRulesConstant} from "../constants/validation-rules.constant";

export class TransactionCategoryDto {

    @ApiProperty()
    @IsString()
    @MinLength(validationRulesConstant.name.minLength)
    @MaxLength(validationRulesConstant.name.maxLength)
    readonly name: string;

    @ApiProperty({description: "Property defines is it main category for all users"})
    @IsBoolean()
    @IsOptional()
    readonly main: boolean;

    @ApiProperty()
    @IsString()
    @MinLength(validationRulesConstant.icon.minLength)
    @MaxLength(validationRulesConstant.icon.maxLength)
    readonly icon: string;
}