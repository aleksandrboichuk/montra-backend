import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {RegisterUserDto} from "./dto/register-user.dto";
import * as argon2 from 'argon2';
import {JwtService} from "@nestjs/jwt";
import {LoginUserDto} from "./dto/login-user.dto";
import {MailService} from "../mail/mail.service";
import {VerifyUserDto} from "./dto/verify-user.dto";
import {Prisma, User} from "@prisma/client";
import {errorKeysConstant} from "./constants/error-keys.constant";
import {JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_SECRET} from "../environments/environments";
import {UserPayloadDto} from "./dto/user-payload.dto";
import {AuthTokensDto} from "./dto/auth-tokens.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user: Prisma.UserGetPayload<any> = await this.usersService.findOne(
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

    async register(dto: RegisterUserDto) {
        const userExists: Prisma.UserGetPayload<any> = await this.usersService.findOne({
                email: dto.email
            }, {
                id: true
            }
        );

        if(userExists){
            // throw new BadRequestException(errorKeysConstant.register.emailAlreadyExists)
            await this.usersService.remove(userExists.id);
        }

        const user: User = await this.usersService.create(dto);

        await this.sendEmailVerificationCode(user.id);

        return user;
    }

    async login(dto: LoginUserDto): Promise<AuthTokensDto> {
        const user: Prisma.UserGetPayload<any> = await this.usersService.findOne({
            email: dto.email
        });

        const { accessToken, refreshToken } = await this.getTokens({
            id: user.id,
            email: user.email,
            admin: user.admin
        });

        await this.usersService.updateRefreshToken(user.id, refreshToken);

        return {
            accessToken,
            refreshToken
        }
    }

    async refreshToken(userId: string, token: string): Promise<AuthTokensDto> {
        const user: Prisma.UserGetPayload<any> = await this.usersService.findOne({
            id:userId
        }, {
            id: true,
            email: true,
            refresh_token: true
        });

        if(!user || !await argon2.verify( user.refresh_token, token)){
            throw new UnauthorizedException(errorKeysConstant.refresh.incorrectToken);
        }

        const {accessToken, refreshToken} = await this.getTokens({
            id: user.id,
            email: user.email,
            admin: user.admin
        });

        await this.usersService.updateRefreshToken(userId, refreshToken);

        return {
            accessToken,
            refreshToken
        };
    }

    async getTokens(payload: UserPayloadDto): Promise<AuthTokensDto> {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateToken(payload),
            this.generateToken(payload, true),
        ]);

        return {
            accessToken,
            refreshToken
        }
    }

    async generateToken(payload: object, refresh: boolean = false): Promise<string> {
        return this.jwtService.signAsync(payload, {
            expiresIn: refresh
                ? JWT_REFRESH_EXPIRES_IN
                : JWT_EXPIRES_IN,
            secret: refresh
                ? JWT_REFRESH_SECRET
                : JWT_SECRET
        })
    }

    async verifyUser(dto: VerifyUserDto): Promise<AuthTokensDto> {
        const user: Prisma.UserGetPayload<any> = await this.usersService.getUserByEmailVerificationCode(dto.code);

        if(!user){
            throw new BadRequestException(errorKeysConstant.code.incorrect)
        }

        const {accessToken, refreshToken} = await this.getTokens({
            id: user.id,
            email: user.email,
            admin: user.admin
        });

        await this.usersService.setEmailVerified(user.id, refreshToken);

        return {
            accessToken,
            refreshToken
        }
    }

    async sendEmailVerificationCode(userId: string): Promise<boolean> {
        const user: Prisma.UserGetPayload<any> = await this.usersService.findOne({
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

        await this.usersService.updateEmailVerificationCode(user.id, code);

        return this.mailService.sendVerificationCode(code, user.email, user.name);
    }

    generateVerificationCode(length: number): string {
        let code: string = '';
        const characters = '0123456789';
        const charactersLength: number = characters.length;
        for (let i: number = 0; i < length; i++) {
            code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return code;
    }
}
