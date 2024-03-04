import {$Enums} from ".prisma/client";
import {ApiProperty} from "@nestjs/swagger";
import {WalletDto} from "../../wallets/dto/wallet.dto";

export class UserDto {

    @ApiProperty({
        example: "uuid-uuid-uuid-uuid"
    })
    readonly id: string

    @ApiProperty({
        example: "test@email.com"
    })
    readonly email: string

    @ApiProperty({
        example: "+380123123123"
    })
    readonly phone: string | null

    @ApiProperty({
        example: "John"
    })
    readonly name: string | null

    @ApiProperty({
        example: "https://example.com/path/to/avatar.png"
    })
    readonly avatar: string | null

    @ApiProperty({
        description: "User age",
        example: 18
    })
    readonly age: number | null

    @ApiProperty({
        example: "Ukraine"
    })
    readonly country: string | null

    @ApiProperty({
        example: "UA"
    })
    readonly locale: string | null

    @ApiProperty({
        example: false
    })
    readonly phone_verified: boolean

    @ApiProperty({
        example: false
    })
    readonly email_verified: boolean

    @ApiProperty({
        example: "GOOGLE",
        enum: $Enums.SocialNetwork
    })
    readonly social_network: $Enums.SocialNetwork | null

    @ApiProperty({
        example: true
    })
    readonly admin: boolean

    @ApiProperty()
    readonly wallets: WalletDto
}