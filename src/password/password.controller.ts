import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ForgotPasswordDto} from "./dto/forgot-password.dto";
import {PasswordService} from "./password.service";
import {ResetPasswordDto} from "./dto/reset-password.dto";

@ApiTags("User Password Operation")
@Controller('/auth/password')
export class PasswordController {

    constructor(
        private passwordService: PasswordService
    ) {}

    @ApiOperation({description: "Send mail with reset password link"})
    @ApiOkResponse({schema: {
            type: 'object',
            properties: {
                success: {description: "Letter sending result", type: "boolean"},
                refreshToken: {description: "Refresh bearer token", type: "string"}
            },
        }, description: "Letter with reset link was sent"})
    @ApiBadRequestResponse({schema: {
            type: 'object',
            properties: {
                message: {description: "User not found"}
            },
        }})
    @Post("/forgot")
    async forgotPassword(@Body() dto: ForgotPasswordDto){
        return {
            success: await this.passwordService.sendForgotPasswordLink(dto)
        };
    }

    @ApiOperation({description: "Validate reset password code"})
    @ApiOkResponse({schema: {
            type: 'object',
            properties: {
                userId: {description: "User Id", type: "string"},
            },
        }, description: "Code is valid"})
    @ApiBadRequestResponse({schema: {
            type: 'object',
            properties: {
                message: {description: "Code is invalid"}
            },
    }})
    @Get("/reset/validate/:code")
    async validateCode(@Param("code") code : string) {
        return {
            userId: await this.passwordService.getUserIdByCode(code)
        };
    }

    @ApiOperation({description: "Reset user password by code"})
    @ApiOkResponse({schema: {
            type: 'object',
            properties: {
                success: {description: "Password was reset", type: "boolean"},
            },
        }, description: "Code is valid"})
    @ApiBadRequestResponse({schema: {
            type: 'object',
            properties: {
                message: {description: "Code is invalid or expired"}
            },
        }})
    @Post("/reset")
    async resetPassword(@Body() dto: ResetPasswordDto){
        return {
            success: await this.passwordService.resetPassword(dto)
        };
    }
}
