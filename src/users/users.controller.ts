import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation, ApiSecurity, ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {endpointsDoc} from "./docs/endpoints.doc";
import {UserDto} from "./dto/user.dto";
import {API_KEY_HEADER_NAME, BEARER_AUTH_NAME} from "../environments/environments";

@ApiTags("User")
@Controller('users')
@ApiSecurity(API_KEY_HEADER_NAME)
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({description: "Get user profile"})
    @ApiOkResponse({type: UserDto})
    @ApiUnauthorizedResponse(endpointsDoc.profile.responses.unauthorized)
    @ApiBearerAuth(BEARER_AUTH_NAME)
    @Get("profile")
    @UseGuards(JwtAuthGuard)
    async profile(@Request() req): Promise<{data: object}>
    {
        return {
            data: await this.userService.profile(req.user.id)
        }
    }
}
