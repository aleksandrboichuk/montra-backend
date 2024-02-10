import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignupUserDto} from "../user/dto/signup-user.dto";
import {ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthGuard} from "@nestjs/passport";

@ApiTags("Authorization")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({description: "Sign Up User"})
    @ApiOkResponse({schema: {
            type: 'object',
            properties: {
                access_token: {description: "Access Bearer Token", type: "string"},
                user: {description: "User Data", type: "object"}
            },
    }, description: "User successfully registered and logged in"})
    @ApiBadRequestResponse({schema: {
            type: 'object',
            properties: {
                message: {description: "Validation errors", type: "object"},
            },
    }, description: "Request body validation errors"})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {description: "User Name", example: "John"},
                email: {description: "User Email", example: "test@montra.com"},
                password: {description: "User Password", example: "12345qwerty"},
            },
        },
    })
    @Post("/register")
    async register(@Body() dto: SignupUserDto)
    {
        return this.authService.register(dto);
    }

    @ApiOperation({description: "Login User"})
    @ApiOkResponse({schema: {
            type: 'object',
            properties: {
                access_token: {description: "Access Bearer Token", type: "string"},
                user: {description: "User Data", type: "object"}
            },
        }, description: "User successfully logged in"})
    @ApiBadRequestResponse({schema: {
            type: 'object',
            properties: {
                message: {description: "Authentication errors"}
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
    @UseGuards(AuthGuard('local'))
    @Post("/login")
    async login(@Request() req)
    {
        return this.authService.login(req.user);
    }
}
