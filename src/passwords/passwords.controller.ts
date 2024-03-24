import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {ForgotPasswordDto} from "./dto/forgot-password.dto";
import {PasswordsService} from "./passwords.service";
import {ResetPasswordDto} from "./dto/reset-password.dto";
import {endpointsDoc} from "./docs/endpoints.doc";
import {API_KEY_HEADER_NAME} from "../environments/environments";

@ApiTags("User Passwords Operation")
@Controller('/auth/passwords')
@ApiSecurity(API_KEY_HEADER_NAME)
export class PasswordsController {

    constructor(
        private passwordService: PasswordsService
    ) {}

    @ApiOperation({description: "Send mail with reset passwords link"})
    @ApiOkResponse(endpointsDoc.forgotPassword.responses.ok)
    @ApiBadRequestResponse(endpointsDoc.forgotPassword.responses.badRequest)
    @Post("/forgot")
    async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<{success: boolean}> {
        return {
            success: await this.passwordService.sendForgotPasswordLink(dto)
        };
    }

    @ApiOperation({description: "Validate reset passwords code"})
    @ApiOkResponse(endpointsDoc.validateCode.responses.ok)
    @ApiBadRequestResponse(endpointsDoc.validateCode.responses.badRequest)
    @Get("/reset/validate/:code")
    async validateCode(@Param("code") code : string): Promise<{userId: string}> {
        return {
            userId: await this.passwordService.getUserIdByCode(code)
        };
    }

    @ApiOperation({description: "Reset user passwords by code"})
    @ApiOkResponse(endpointsDoc.resetPassword.responses.ok)
    @ApiBadRequestResponse(endpointsDoc.resetPassword.responses.badRequest)
    @Post("/reset")
    async resetPassword(@Body() dto: ResetPasswordDto): Promise<{success: boolean}> {
        return {
            success: await this.passwordService.resetPassword(dto)
        };
    }
}
