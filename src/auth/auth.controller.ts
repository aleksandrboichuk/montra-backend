import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterUserDto} from "./dto/register-user.dto";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {JwtRefreshGuard} from "./guards/jwt-refresh.guard";
import {VerifyUserDto} from "./dto/verify-user.dto";
import {EmailVerificationCodeDto} from "./dto/email-verification-code.dto";

@ApiTags("Authorization")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({description: "Register user"})
    @ApiOkResponse({schema: {
            type: 'object',
            properties: {
                data: {description: "User item body", type: "boolean"},
            },
    }, description: "User successfully registered and logged in"})
    @ApiBadRequestResponse({schema: {
            type: 'object',
            properties: {
                message: {description: "Validation errorMessages", type: "object"},
            },
    }, description: "Request body validation errorMessages"})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {description: "User name", example: "John"},
                email: {description: "User email", example: "test@montra.com"},
                password: {description: "User password", example: "12345qwerty"},
            },
        },
    })
    @Post("/register")
    async register(@Body() dto: RegisterUserDto): Promise<{data: object}>
    {
        return {
            data: await this.authService.register(dto)
        };
    }

    @ApiOperation({description: "Login User"})
    @ApiOkResponse({schema: {
            type: 'object',
            properties: {
                accessToken: {description: "Access bearer token", type: "string"},
                refreshToken: {description: "Refresh bearer token", type: "string"}
            },
        }, description: "User successfully logged in"})
    @ApiBadRequestResponse({schema: {
            type: 'object',
            properties: {
                message: {description: "Authentication errorMessages"}
            },
        }})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {description: "User Email", example: "test@montra.com"},
                password: {description: "User Password", example: "12345qwerty"},
            },
        },
    })
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Request() req): Promise<{accessToken: string, refreshToken: string}>
    {
        return this.authService.login(req.user);
    }

    @ApiOperation({description: "Refresh bearer token"})
    @ApiOkResponse({schema: {
            type: 'object',
            properties: {
                accessToken: {description: "Access bearer token", type: "string"},
                refreshToken: {description: "Refresh bearer token", type: "string"}
            },
        }, description: "Token successfully refreshed"})
    @ApiBadRequestResponse({schema: {
            type: 'object',
            properties: {
                message: {description: "Invalid token"}
            },
    }})
    @ApiBearerAuth("Authorization")
    @UseGuards(JwtRefreshGuard)
    @Post("/refresh")
    async refreshToken(@Request() req): Promise<{accessToken: string, refreshToken: string}>
    {
        return this.authService.refreshToken(req.user.id, req.user.refreshToken);
    }

    @ApiOperation({description: "User email verification"})
    @ApiOkResponse({schema: {
            type: 'object',
            properties: {
                accessToken: {description: "Access bearer token", type: "string"},
                refreshToken: {description: "Refresh bearer token", type: "string"}
            },
        }, description: "Email successfully verified and logged in"})
    @ApiBadRequestResponse({schema: {
            type: 'object',
            properties: {
                message: {description: "Verification code error message", type: "object"},
            },
        }, description: "Verification code errorMessages"})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                code: {description: "Verification code", example: "123456"},
            },
        },
    })
    @Post("/verification/email/verify")
    async verifyEmail(@Body() dto: VerifyUserDto): Promise<{accessToken: string, refreshToken: string}>
    {
        return await this.authService.verifyUser(dto);
    }

    @ApiOperation({description: "User email verification"})
    @ApiOkResponse({schema: {
            type: 'object',
            properties: {
                success: {description: "Sending result", type: "boolean"},
            },
        }, description: "User successfully registered and logged in"})
    @ApiBadRequestResponse({schema: {
            type: 'object',
            properties: {
                message: {description: "Verification code errorMessages", type: "object"},
            },
        }, description: "Request body validation errorMessages"})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                userId: {description: "User Id", example: "uuid123", type: "numeric"},
            },
        },
    })
    @Post("/verification/email/send-letter")
    async sendEmailVerificationLetter(@Body() dto: EmailVerificationCodeDto): Promise<{success: boolean}>
    {
        return {
            success: await this.authService.sendEmailVerificationCode(dto.userId)
        };
    }
}
