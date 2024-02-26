import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as argon2 from 'argon2';
import {JwtService} from "@nestjs/jwt";
import {MailService} from "../mail/mail.service";
import {Prisma, User} from "@prisma/client";
import {errorMessagesConstant} from "./constants/error-messages.constant";
import {JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_SECRET} from "@environments";
import {LoginInput, RegisterInput, VerifyEmailInput} from "./graphql.schema";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private mailService: MailService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user: Prisma.UserGetPayload<any> = await this.userService.findOne(
            {email},
            {
                id: true,
                password: true,
                email_verified: true
            }
        );

        if (user && await argon2.verify(user.password, password)) {

            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async register(input: RegisterInput): Promise<User> {
        const userExists: Prisma.UserGetPayload<any> = await this.userService.findOne({
                email: input.email
            }, {
                id: true
            }
        );

        if(userExists){
            throw new BadRequestException(errorMessagesConstant.register.emailAlreadyExists)
        }

        const user: User = await this.userService.create(input);

        await this.sendEmailVerificationCode(user.id);

        return user;
    }

    async login(input: LoginInput): Promise<{accessToken: string, refreshToken: string}>
    {
        const user: Prisma.UserGetPayload<any> = await this.userService.findOne({
            email: input.email
        });

        const { accessToken, refreshToken } = await this.getTokens({
            id: user.id,
            email: user.email
        });

        await this.userService.updateRefreshToken(user.id, refreshToken);

        return {
            accessToken,
            refreshToken
        }
    }

    async refreshToken(userId: string, token: string): Promise<{accessToken: string, refreshToken: string}>
    {
        const user: Prisma.UserGetPayload<any> = await this.userService.findOne({
            id:userId
        }, {
            id: true,
            email: true,
            refresh_token:true
        });

        if(!user || !await argon2.verify( user.refresh_token, token)){
            throw new UnauthorizedException("invalidAccessToken");
        }

        const {accessToken, refreshToken} = await this.getTokens({
            id: user.id,
            email: user.email
        });

        await this.userService.updateRefreshToken(userId, refreshToken);

        return {
            accessToken,
            refreshToken
        };
    }

    async getTokens(payload: object): Promise<{accessToken: string, refreshToken: string}>
    {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateToken(payload),
            this.generateToken(payload, true),
        ]);

        return {
            accessToken,
            refreshToken
        }
    }

    async generateToken(payload: object, refresh: boolean = false): Promise<string>
    {
        return this.jwtService.signAsync(payload, {
            expiresIn: refresh
                ? JWT_REFRESH_EXPIRES_IN!
                : JWT_EXPIRES_IN!,
            secret: refresh
                ? JWT_REFRESH_SECRET!
                : JWT_SECRET!
        })
    }

    async verifyUser(input: VerifyEmailInput): Promise<{accessToken: string, refreshToken: string}>
    {
        const user: Prisma.UserGetPayload<any> = await this.userService.getUserByEmailVerificationCode(input.code);

        if(!user){
            throw new BadRequestException(errorMessagesConstant.code.incorrect)
        }

        await this.userService.setUserEmailVerified(user.id);

        const {accessToken, refreshToken} = await this.getTokens({
            id: user.id,
            email: user.email
        });

        return {
            accessToken,
            refreshToken
        }
    }

    async sendEmailVerificationCode(userId: string): Promise<boolean>
    {
        const user: Prisma.UserGetPayload<any> = await this.userService.findOne({
            id: userId,
        }, {
            id: true,
            name: true,
            email: true
        });

        if(!user){
            throw new BadRequestException("User not found");
        }
        const code: string = this.generateVerificationCode(6);

        await this.userService.updateEmailVerificationCode(user.id, code);

        return this.mailService.sendVerificationCode(code, user.email, user.name);
    }

    generateVerificationCode(length: number): string
    {
        let code: string = '';
        const characters = '0123456789';
        const charactersLength: number = characters.length;
        for (let i: number = 0; i < length; i++) {
            code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return code;
    }
}
