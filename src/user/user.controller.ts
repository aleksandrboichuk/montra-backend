import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation, ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {endpointsDoc} from "./docs/endpoints.doc";

@ApiTags("User")
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({description: "Get user profile"})
    @ApiOkResponse(endpointsDoc.profile.responses.ok)
    @ApiUnauthorizedResponse(endpointsDoc.profile.responses.unauthorized)
    @ApiBearerAuth("Authorization")
    @Get("profile")
    @UseGuards(JwtAuthGuard)
    async profile(@Request() req): Promise<{data: {}}>
    {
        return {
            data: await this.userService.getProfile(req.user.id)
        }
    }
}
