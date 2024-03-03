import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation, ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {endpointsDoc} from "./docs/endpoints.doc";
import {UserDto} from "./dto/user.dto";

@ApiTags("User")
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({description: "Get user profile"})
    @ApiOkResponse({type: UserDto})
    @ApiUnauthorizedResponse(endpointsDoc.profile.responses.unauthorized)
    @ApiBearerAuth("Authorization")
    @Get("profile")
    @UseGuards(JwtAuthGuard)
    async profile(@Request() req): Promise<{data: object}>
    {
        return {
            data: await this.userService.profile(req.user.id)
        }
    }
}
