import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterUserDto} from "./dto/register-user.dto";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiTags, PickType
} from "@nestjs/swagger";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {JwtRefreshGuard} from "./guards/jwt-refresh.guard";
import {VerifyUserDto} from "./dto/verify-user.dto";
import {EmailVerificationCodeDto} from "./dto/email-verification-code.dto";
import {endpointsDoc} from "./docs/endpoints.doc";
import {AuthTokensDto} from "./dto/auth-tokens.dto";
import {UserDto} from "../users/dto/user.dto";

@ApiTags("Authorization")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({description: "Register user"})
    @ApiOkResponse({type: PickType(UserDto,["id"])})
    @ApiBadRequestResponse(endpointsDoc.register.responses.badRequest)
    @ApiBody(endpointsDoc.register.body)
    @Post("/register")
    async register(@Body() dto: RegisterUserDto): Promise<{data: Pick<UserDto,"id">}> {
        return {
            data: await this.authService.register(dto)
        };
    }

    @ApiOperation({description: "Login User"})
    @ApiOkResponse({type: AuthTokensDto})
    @ApiBadRequestResponse(endpointsDoc.login.responses.badRequest)
    @ApiBody(endpointsDoc.login.body)
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Request() req): Promise<AuthTokensDto>
    {
        return this.authService.login(req.user);
    }

    @ApiOperation({description: "Refresh bearer token"})
    @ApiOkResponse({type: AuthTokensDto})
    @ApiBadRequestResponse(endpointsDoc.refreshToken.responses.badRequest)
    @ApiBearerAuth("Authorization")
    @UseGuards(JwtRefreshGuard)
    @Post("/refresh")
    async refreshToken(@Request() req): Promise<AuthTokensDto>
    {
        return this.authService.refreshToken(req.user.id, req.user.refreshToken);
    }

    @ApiOperation({description: "User email verification"})
    @ApiOkResponse({type: AuthTokensDto})
    @ApiBadRequestResponse(endpointsDoc.verifyEmail.responses.badRequest)
    @ApiBody(endpointsDoc.verifyEmail.body)
    @Post("/verification/email/verify")
    async verifyEmail(@Body() dto: VerifyUserDto): Promise<AuthTokensDto>
    {
        return await this.authService.verifyUser(dto);
    }

    @ApiOperation({description: "User email verification"})
    @ApiOkResponse(endpointsDoc.sendEmailVerificationLetter.responses.ok)
    @ApiBadRequestResponse(endpointsDoc.sendEmailVerificationLetter.responses.badRequest)
    @ApiBody(endpointsDoc.sendEmailVerificationLetter.body)
    @Post("/verification/email/send-letter")
    async sendEmailVerificationLetter(@Body() dto: EmailVerificationCodeDto): Promise<{success: boolean}>
    {
        return {
            success: await this.authService.sendEmailVerificationCode(dto.userId)
        };
    }
}
