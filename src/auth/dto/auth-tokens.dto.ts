import {ApiProperty} from "@nestjs/swagger";

export class AuthTokensDto {

    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiZDdmM2FmLTMy..."
    })
    accessToken: string;

    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiZDdmM2FmLTMy..."
    })
    refreshToken: string
}