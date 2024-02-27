import {Body, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {JwtRefreshGuard} from "./guards/jwt-refresh.guard";
import {Resolver, Query, Mutation, Args, Context} from "@nestjs/graphql";
import {
    JWTTokens,
    LoginInput,
    RefreshTokenPayload,
    Register,
    RegisterInput, SendEmailVerificationLetter, SendEmailVerificationLetterInput,
    Test,
    VerifyEmailInput
} from "./graphql.schema";
import {CurrentUser} from "../decorators/current-user.decorator";

@Resolver('Auth')
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

    @Query("test")
    async test(){
        return "OK"
    }

    @Mutation("register")
    async register(@Args("input") input: RegisterInput): Promise<Register> {
        return await this.authService.register(input);
    }

    @Mutation("login")
    @UseGuards(LocalAuthGuard)
    async login(@Args("input") input: LoginInput): Promise<JWTTokens> {
        return this.authService.login(input);
    }

    @Mutation("refresh")
    @UseGuards(JwtRefreshGuard)
    async refreshToken(@CurrentUser() user: RefreshTokenPayload): Promise<JWTTokens> {
        return this.authService.refreshToken(user.id, user.refreshToken);
    }

    @Mutation("verifyEmail")
    async verifyEmail(@Args("input") input: VerifyEmailInput): Promise<JWTTokens> {
        return await this.authService.verifyUser(input);
    }

    @Mutation("sendEmailVerificationLetter")
    async sendEmailVerificationLetter(
        @Args("input") input: SendEmailVerificationLetterInput
    ): Promise<SendEmailVerificationLetter> {
        return {
            success: await this.authService.sendEmailVerificationCode(input.userId)
        };
    }
}
