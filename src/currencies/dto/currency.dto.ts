import {ApiProperty} from "@nestjs/swagger";
import {MaxLength, MinLength} from "class-validator";

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
    @MinLength(1)
    @MaxLength(50)
    readonly name: string

    @ApiProperty({
        description: "Currency symbol",
        example: "$"
    })
    @MinLength(1)
    @MaxLength(5)
    readonly symbol: string

    @ApiProperty({
        description: "Currency code",
        example: "USD"
    })
    @MinLength(3)
    @MaxLength(3)
    readonly code: string
}